import SearchBox from "@/components/SearchBox";
import Slider from "@/components/Slider";
import Link from "next/link";

const ExplorePage = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4"></div>
      <div className="p-4">
        <Slider />
      </div>
      <div className="p-4">
          <main className="mx-auto max-w-xl p-8 space-y-4">
      <h1 className="text-3xl font-bold">AI Starters</h1>
      <ul className="list-disc pl-6">
        <li><Link className="underline" href="/chat">Chatbot</Link></li>
        <li><Link className="underline" href="/search-agent">Search Agent</Link></li>
      </ul>
    </main>
      </div>
      <div className="p-4">
        <SearchBox />
      </div>
      <div className="p-4"></div>
    </>
  );
};

export default ExplorePage;
