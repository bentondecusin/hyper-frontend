import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiOutlineInfoCircle } from "react-icons/ai";

export default function Header({ className }: { className?: string }) {
  return (
    <header className={`flex items-center justify-center text-l ${className}`}>
      <Link
        href="https://arxiv.org/pdf/2203.14692.pdf"
        className="text-4xl ml-3 mr-3"
      >
        <p> HypeR </p>
      </Link>

      <Link
        href="https://github.com/sainyam/Hyper-Code"
        aria-label={"Hyper-Code "}
        target="_blank"
      >
        {/* <div className="flex items-center justify-between max-h-7">
          <div className="mr-3">
            <Image
              src="https://cis.cornell.edu/sites/default/themes/awp_cis/img/cis_full_2_line_red.png"
              width={500}
              height={500}
              sizes="(max-height: 50px) 80vw, 33vw" alt={""}            />
          </div>
        </div> */}
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
