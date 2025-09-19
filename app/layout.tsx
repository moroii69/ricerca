import type React from "react";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	preload: true,
});

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	variable: "--font-instrument-serif",
	weight: ["400"],
	display: "swap",
	preload: true,
});

export const metadata: Metadata = {
	title: "ricerca - Search Everywhere, Find Anything",
	description:
		"One search query, multiple search engines. Compare results instantly across Google, Bing, DuckDuckGo, Yahoo, Yandex, and Baidu.",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
			<head>
				<meta name="apple-mobile-web-app-title" content="ricerca" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap"
				/>
			</head>
			<body className="font-sans antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
