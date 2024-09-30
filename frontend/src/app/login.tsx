'use client';

import React from 'react';
import Link from 'next/link';

const Login = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-900">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
				<h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
					Login
				</h2>
				<form>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter your username"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter your password"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Login
						</button>
						<Link
							href="/forgot-password"
							className="inline-block align-baseline font-bold text-sm text-blue-900 hover:text-blue-700"
						>
							Forgot Password?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
