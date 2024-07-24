import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found --- root</h2>
      <p>Could not find requested resource</p>
      <Image src="/images/404.png" alt="404" layout="fill"></Image>
      <Link href="/">Return Home</Link>
    </div>
  );
}

