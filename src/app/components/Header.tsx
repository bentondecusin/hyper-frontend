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
        <p> hyperDB </p>
      </Link>
    </header>
  );
}
