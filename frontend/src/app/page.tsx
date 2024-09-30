'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen items-center justify-between p-6 md:p-12 lg:p-24 bg-blue-900">
			<nav className="flex items-center justify-between w-full max-w-5xl font-mono text-sm">
				<div className="flex items-center">
					<Image
						src="/logo.png"
						alt="Logo"
						width={40}
						height={40}
					/>
					<span className="ml-3 text-lg font-bold text-white">
						houdinis
					</span>
				</div>
				<div className="flex">
					<Link
						href="/login"
						className="mr-4 px-3 py-2 md:px-4 md:py-2 bg-white text-blue-900 rounded-lg"
					>
						Login
					</Link>
					<Link
						href="/signup"
						className="px-3 py-2 md:px-4 md:py-2 bg-orange-500 text-white rounded-lg"
					>
						Sign Up
					</Link>
				</div>
			</nav>

			<div className="flex-grow flex flex-col md:flex-row w-full max-w-5xl mt-4 md:mt-12 ">
				<div className="w-full md:w-1/2 flex flex-col justify-start items-start px-6 md:px-12 mt-[-10px] md:mt-[-10px]">
					<h1 className="text-2xl md:text-4xl font-bold mb-6 text-white">
						Notion to publish in Minutes
					</h1>
					<p className="text-base md:text-lg mb-6 text-white">
						Centralize, Automate, and Elevate Your Content
						Management Process with AI
					</p>
					<button className="px-4 py-2 mb-6 md:px-6 md:py-3 bg-orange-500 text-white rounded-lg">
						Join the revolution
					</button>
				</div>
				<div className="w-full md:w-1/2 mt-8 md:mt-0">
					<video
						className="w-full h-auto"
						controls
						autoPlay
					>
						<source
							src="/HeroSectionVideo.mp4"
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</main>
	);
}
