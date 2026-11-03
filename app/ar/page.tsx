import { redirect } from "next/navigation";

// The Arabic version is turned off; old /ar links go to the English site.
// To bring it back, render <Home c={getContent("ar")} /> here (the Arabic text is still in data/content.ts).
export default function Page() {
  redirect("/");
}
