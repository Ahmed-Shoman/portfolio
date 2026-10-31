import Home from "@/components/Home";
import { getContent } from "@/data/content";

export default function Page() {
  return <Home c={getContent("en")} />;
}
