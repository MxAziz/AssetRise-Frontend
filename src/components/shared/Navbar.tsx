import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Navbar() {
    return (
      <nav className="pt-10 pb-8 w-360 mx-auto">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="flex justify-center items-center gap-2 font-bold">
              <Image src="/images/logo/logo.png" alt="this is a website logo" width={44} height={44}/>
              <h1 className="text-[30px]">AssetRise</h1>
            </Link>
          </div>
          {/* route pages */}
          <div>
            <Link href="/" className="mr-4">
              Home
            </Link>
            <Link href="/properties" className="mr-4">
              Properties
            </Link>
            <Link href="/agents" className="mr-4">
              Agents
            </Link>
            <Link href="/about" className="mr-4">
              About
            </Link>
            <Link href="/blog" className="mr-4">
              Blog
            </Link>
            <Link href="/contact" className="mr-4">
              Contact
            </Link>
          </div>
          {/* end button */}
          <Link href="/book-viewing" >
            <Button className="px-6 py-5 cursor-pointer">Book a Viewing</Button>
          </Link>
        </div>
      </nav>
    );
}