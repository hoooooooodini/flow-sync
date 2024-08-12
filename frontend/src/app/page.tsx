import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-blue">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-dark-blue">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <div>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/signup" className="text-white bg-orange-500 px-4 py-2 rounded">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center flex-wrap md:flex-nowrap">
        {/* Left Section */}
        <div className="text-center md:text-left md:w-1/2 p-10">
          <h1 className="text-white text-4xl font-bold">Notion to publish in "Minutes"</h1>
          <p className="text-orange-500 mt-4">Centralize, Automate, and Elevate Your Content Management Process with AI</p>
          <button className="mt-8 bg-orange-500 text-white py-3 px-6 rounded">
            Join the revolution
          </button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-10">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
