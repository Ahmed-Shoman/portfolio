"""Store Shooter: screenshots the stores in stores.csv and builds the review page."""
import json
import os
import queue
import re
import shutil
import subprocess
import threading
import webbrowser
from pathlib import Path
from tkinter import filedialog, messagebox

import customtkinter as ctk

SCRIPTS = Path(__file__).parent
ROOT = SCRIPTS.parent
CSV = SCRIPTS / "stores.csv"
DATA = ROOT / "data" / "stores.json"
IMG_DIR = ROOT / "public" / "img" / "stores"
REVIEW = SCRIPTS / "review.html"
MANUAL = SCRIPTS / "manual-excluded.json"
FONT = "Segoe UI"
NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)
LINE = re.compile(r"^\[\s*(\d+)/(\d+)\]\s+(\w+)\s+(\w+)\s+(\S+)")

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("green")


def count_rows(p: Path) -> int:
    """Number of unique store links the shooter will actually use."""
    r = subprocess.run(["node", str(SCRIPTS / "shoot-stores.mjs"), "--count"], cwd=ROOT,
                       capture_output=True, creationflags=NO_WINDOW)
    try:
        return int(r.stdout.decode().strip().splitlines()[-1])
    except Exception:
        return 0


class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Store Shooter")
        self.geometry("900x760")
        self.minsize(780, 640)
        self.msgs = queue.Queue()
        self.proc = None
        self.tally = {}

        ctk.CTkLabel(self, text="Store Shooter", font=(FONT, 26, "bold")).pack(pady=(18, 0))
        ctk.CTkLabel(self, text="بيصوّر المتاجر اللي في stores.csv ويجهّز صفحة المراجعة للبورتفوليو",
                     font=(FONT, 14), text_color="#9aa4b2").pack(pady=(2, 14))

        # CSV
        row = ctk.CTkFrame(self, fg_color="transparent")
        row.pack(fill="x", padx=20)
        self.csv = ctk.CTkEntry(row, height=40, font=(FONT, 13), placeholder_text="اختار ملف stores.csv")
        self.csv.pack(side="left", fill="x", expand=True)
        ctk.CTkButton(row, text="اختار الملف", width=120, height=40, font=(FONT, 14), command=self.pick).pack(side="left", padx=(10, 0))
        self.csv_info = ctk.CTkLabel(self, text="", font=(FONT, 12), text_color="#9aa4b2", anchor="e")
        self.csv_info.pack(fill="x", padx=20, pady=(4, 0))

        # Options
        opts = ctk.CTkFrame(self)
        opts.pack(fill="x", padx=20, pady=12)
        opts.grid_columnconfigure((0, 1), weight=1)
        ctk.CTkLabel(opts, text="متاجر في نفس الوقت", font=(FONT, 13)).grid(row=0, column=1, sticky="e", padx=12, pady=(10, 2))
        self.conc = ctk.CTkSegmentedButton(opts, values=["2", "4", "6"], font=(FONT, 13))
        self.conc.set("4")
        self.conc.grid(row=1, column=1, sticky="e", padx=12, pady=(0, 12))
        ctk.CTkLabel(opts, text="جودة الصور (JPG)", font=(FONT, 13)).grid(row=0, column=0, sticky="e", padx=12, pady=(10, 2))
        self.quality = ctk.CTkSegmentedButton(opts, values=["70", "78", "85"], font=(FONT, 13))
        self.quality.set("78")
        self.quality.grid(row=1, column=0, sticky="e", padx=12, pady=(0, 12))

        # Actions
        acts = ctk.CTkFrame(self, fg_color="transparent")
        acts.pack(fill="x", padx=20)
        self.go = ctk.CTkButton(acts, text="ابدأ التصوير", height=44, font=(FONT, 15, "bold"), command=self.start)
        self.go.pack(side="right")
        self.stop_btn = ctk.CTkButton(acts, text="إيقاف", height=44, width=90, font=(FONT, 14), fg_color="#a33",
                                      hover_color="#822", command=self.stop, state="disabled")
        self.stop_btn.pack(side="right", padx=8)
        self.retry = ctk.CTkButton(acts, text="أعد الواقعين", height=44, width=120, font=(FONT, 14),
                                   fg_color="#3a4150", hover_color="#4a5262", command=self.retry_down)
        self.retry.pack(side="right")
        self.review_btn = ctk.CTkButton(acts, text="صفحة المراجعة", height=44, width=130, font=(FONT, 14),
                                        fg_color="#3a4150", hover_color="#4a5262", command=self.open_review)
        self.review_btn.pack(side="left")
        ctk.CTkButton(acts, text="فولدر الصور", height=44, width=110, font=(FONT, 14), fg_color="#3a4150",
                      hover_color="#4a5262", command=lambda: os.startfile(IMG_DIR) if IMG_DIR.exists() else None
                      ).pack(side="left", padx=8)
        ctk.CTkButton(acts, text="لزق المحذوفين", height=44, width=120, font=(FONT, 14), fg_color="#3a4150",
                      hover_color="#4a5262", command=self.paste_removed).pack(side="left")

        # Progress
        self.bar = ctk.CTkProgressBar(self, height=14)
        self.bar.set(0)
        self.bar.pack(fill="x", padx=20, pady=(16, 6))
        self.status = ctk.CTkLabel(self, text="جاهز", font=(FONT, 14, "bold"), anchor="e")
        self.status.pack(fill="x", padx=20)
        self.counts = ctk.CTkLabel(self, text="", font=(FONT, 12), text_color="#9aa4b2", anchor="e")
        self.counts.pack(fill="x", padx=20)

        self.log = ctk.CTkTextbox(self, font=("Consolas", 12))
        self.log.pack(fill="both", expand=True, padx=20, pady=(8, 20))

        default = CSV if CSV.exists() else Path.home() / "Desktop" / "stores.csv"
        if default.exists():
            self.set_csv(default)
        else:
            self.csv_info.configure(text="مفيش stores.csv لسه — اختاره من «اختار الملف»")
        self.show_last()
        self.after(100, self.pump)
        self.protocol("WM_DELETE_WINDOW", self.on_close)

    # ── CSV ──
    def pick(self):
        p = filedialog.askopenfilename(title="stores.csv", filetypes=[("CSV", "*.csv"), ("All", "*.*")])
        if p:
            self.set_csv(Path(p))

    def set_csv(self, p: Path):
        if p.resolve() != CSV.resolve():
            shutil.copyfile(p, CSV)  # scripts/stores.csv is in .gitignore
        self.csv.delete(0, "end")
        self.csv.insert(0, str(p))
        n = count_rows(CSV)
        self.csv_info.configure(text=f"{n} متجر هيتصوّر" if n else "⚠ ملقتش لينكات متاجر في الملف (محتاج عمود url أو websitelink)",
                                text_color="#9aa4b2" if n else "#e88")

    # ── run ──
    def start(self, only=None):
        if self.proc:
            return
        if not CSV.exists():
            messagebox.showwarning("Store Shooter", "اختار ملف stores.csv الأول")
            return
        self.log.delete("1.0", "end")
        self.tally = {}
        self.bar.set(0)
        args = ["node", str(SCRIPTS / "shoot-stores.mjs")]
        if only:
            args += ["--only", ",".join(only)]
        env = {**os.environ, "CONCURRENCY": self.conc.get(), "JPG_QUALITY": self.quality.get()}
        try:
            self.proc = subprocess.Popen(args, cwd=ROOT, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                         creationflags=NO_WINDOW)
        except FileNotFoundError:
            messagebox.showerror("Store Shooter", "Node.js مش متسطب أو مش في الـ PATH")
            return
        self.go.configure(state="disabled")
        self.retry.configure(state="disabled")
        self.stop_btn.configure(state="normal")
        self.status.configure(text="بيصوّر…")
        threading.Thread(target=self.read, args=(self.proc,), daemon=True).start()

    def read(self, proc):
        for raw in proc.stdout:
            self.msgs.put(("line", raw.decode("utf-8", "replace").rstrip()))
        self.msgs.put(("done", proc.wait()))

    def pump(self):
        try:
            while True:
                kind, val = self.msgs.get_nowait()
                if kind == "line":
                    self.on_line(val)
                else:
                    self.on_done(val)
        except queue.Empty:
            pass
        self.after(100, self.pump)

    def on_line(self, line):
        self.log.insert("end", line + "\n")
        self.log.see("end")
        m = LINE.match(line)
        if m:
            n, total, st, plat = int(m[1]), int(m[2]), m[3], m[4]
            self.bar.set(n / total)
            self.status.configure(text=f"{n} / {total}")
            self.tally[st] = self.tally.get(st, 0) + 1
            self.tally["p:" + plat] = self.tally.get("p:" + plat, 0) + 1
            self.counts.configure(text=self.fmt(self.tally))

    @staticmethod
    def fmt(t):
        st = " · ".join(f"{k}: {t.get(k, 0)}" for k in ("ok", "closed", "down"))
        pl = " · ".join(f"{k[2:]}: {v}" for k, v in sorted(t.items()) if k.startswith("p:"))
        return f"{st}     |     {pl}"

    def on_done(self, code):
        self.proc = None
        self.go.configure(state="normal")
        self.retry.configure(state="normal")
        self.stop_btn.configure(state="disabled")
        size = sum(f.stat().st_size for f in IMG_DIR.glob("*.jpg")) / 1e6 if IMG_DIR.exists() else 0
        n = len(list(IMG_DIR.glob("*.jpg"))) if IMG_DIR.exists() else 0
        self.status.configure(text=("خلص ✓" if code == 0 else f"وقف (code {code})") + f"   ·   {n} صورة · {size:.1f}MB")
        if code == 0 and size > 25:
            self.log.insert("end", "\n⚠ الصور أكبر من 25MB — شغّل تاني بجودة 70\n")
        if code == 0:
            self.build_review(open_it=True)
        elif code == 2:
            messagebox.showwarning("Store Shooter", "ملقتش لينكات متاجر في الملف (محتاج عمود url أو websitelink)")

    def stop(self):
        if self.proc:
            subprocess.run(["taskkill", "/T", "/F", "/PID", str(self.proc.pid)], capture_output=True, creationflags=NO_WINDOW)

    def retry_down(self):
        try:
            rows = json.loads(DATA.read_text(encoding="utf-8"))
        except Exception:
            messagebox.showinfo("Store Shooter", "لسه مفيش نتايج — صوّر الأول")
            return
        down = [r["domain"] for r in rows if r.get("status") == "down"]
        if not down:
            messagebox.showinfo("Store Shooter", "مفيش متاجر واقعة 👌")
            return
        self.start(only=down)

    # ── review ──
    def build_review(self, open_it=True):
        if not DATA.exists():
            return False
        r = subprocess.run(["node", str(SCRIPTS / "build-review.mjs")], cwd=ROOT, capture_output=True, creationflags=NO_WINDOW)
        self.log.insert("end", "\n" + r.stdout.decode("utf-8", "replace") + r.stderr.decode("utf-8", "replace"))
        self.log.see("end")
        if r.returncode == 0 and open_it:
            webbrowser.open(REVIEW.as_uri())
        return r.returncode == 0

    def open_review(self):
        if not self.build_review(open_it=True):
            messagebox.showinfo("Store Shooter", "لسه مفيش نتايج — صوّر الأول")

    def paste_removed(self):
        try:
            items = json.loads(self.clipboard_get())
            assert isinstance(items, list)
        except Exception:
            messagebox.showwarning("Store Shooter", "في صفحة المراجعة دوس «Copy removed list» الأول، وبعدين ارجع هنا")
            return
        MANUAL.write_text(json.dumps(sorted(set(items)), indent=1), encoding="utf-8")
        self.log.insert("end", f"\nاتحفظ {len(items)} متجر محذوف بإيدك → {MANUAL.name}\n")
        self.build_review(open_it=False)

    def show_last(self):
        try:
            rows = json.loads(DATA.read_text(encoding="utf-8"))
        except Exception:
            return
        t = {}
        for r in rows:
            t[r.get("status")] = t.get(r.get("status"), 0) + 1
            t["p:" + str(r.get("platform"))] = t.get("p:" + str(r.get("platform")), 0) + 1
        self.status.configure(text=f"آخر تشغيل: {len(rows)} متجر")
        self.counts.configure(text=self.fmt(t))

    def on_close(self):
        if self.proc and not messagebox.askyesno("Store Shooter", "التصوير لسه شغال. توقفه وتقفل؟"):
            return
        self.stop()
        self.destroy()


if __name__ == "__main__":
    App().mainloop()
