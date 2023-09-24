import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiOutlineInfoCircle } from "react-icons/ai";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}
    >
      <Link
        href="https://arxiv.org/pdf/2203.14692.pdf"
        className="text-4xl ml-3 mr-3"
      >
        <p>HypeR Demo</p>
      </Link>

      <Link
        href="https://github.com/sainyam/Hyper-Code"
        aria-label={"Hyper-Code Repo"}
        target="_blank"
      >
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <AiFillGithub size={"50px"} />
          </div>
        </div>
      </Link>
      {/* <button
        onClick={() => {
          window.open(
            ".com/pinecone-io/pinecone-vercel-starter",
            "_blank"
          );
        }}
        className="fixed right-20 top-4 md:right-20 md:top-6 text-xl text-white"
      >
      </button> */}
    </header>
  );
}
