import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full max-w-5xl font-mono text-sm p-4 bg-blue-900 text-white">
      <div className="flex items-center">
        <Link href="/" className="text-lg font-bold">
          houdinis
        </Link>
      </div>
      <div className="flex">
        <Link href="/login" className="mr-4 px-3 py-2 md:px-4 md:py-2 bg-white text-blue-900 rounded-lg">
          Login
        </Link>
        <Link href="/signup" className="px-3 py-2 md:px-4 md:py-2 bg-orange-500 text-white rounded-lg">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
