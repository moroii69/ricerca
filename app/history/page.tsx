"use client";

import { useEffect, useRef, useState } from "react";
import {
	getSearchHistory,
	clearSearchHistory,
	type SearchHistoryItem,
} from "@/lib/searchHistory";
import { Navigation } from "@/components/layout/Navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function HistoryPage() {
	const [history, setHistory] = useState<SearchHistoryItem[]>([]);
	const [toastMessage, setToastMessage] = useState("");
	const hideTimer = useRef<number | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			const items = await getSearchHistory();
			if (mounted) setHistory(items);
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const handleClearHistory = async () => {
		await clearSearchHistory();
		setHistory([]);
		showToast("History cleared");
	};

	const showToast = (message: string) => {
		setToastMessage(message);
		if (hideTimer.current) {
			window.clearTimeout(hideTimer.current);
		}
		hideTimer.current = window.setTimeout(() => {
			setToastMessage("");
			hideTimer.current = null;
		}, 1200);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		showToast("Copied to clipboard");
	};

	const handleExportJson = () => {
		const dataStr = JSON.stringify(history, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		const date = new Date();
		const yyyy = date.getFullYear();
		const mm = String(date.getMonth() + 1).padStart(2, "0");
		const dd = String(date.getDate()).padStart(2, "0");
		a.href = url;
		a.download = `search-history-${yyyy}${mm}${dd}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(() => URL.revokeObjectURL(url), 0);
		showToast("Exported JSON");
	};

	return (
		<div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center text-[#37322F]">
			<div className="relative flex flex-col justify-start items-center w-full">
				<div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
					<div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>
					<div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

					<div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[66px] relative z-10">
						<Navigation />

						<div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-4 mt-16 sm:mt-20 md:mt-24 lg:mt-28">
							<div className="w-full flex items-center justify-between">
								<h1 className="text-xl sm:text-2xl font-semibold font-sans">
									Search History
								</h1>
								<div className="flex items-center gap-2">
									<button
										onClick={handleExportJson}
										className="px-3 py-1 text-sm text-[rgba(55,50,47,0.70)] hover:text-[#37322F] font-medium transition-colors duration-200 cursor-pointer">
										Export as JSON
									</button>
									<button
										onClick={handleClearHistory}
										className="px-3 py-1 text-sm text-[rgba(55,50,47,0.70)] hover:text-[#37322F] font-medium transition-colors duration-200 cursor-pointer">
										Clear All
									</button>
								</div>
							</div>

							<div className="rounded-lg border border-[rgba(55,50,47,0.12)] bg-white/60 backdrop-blur-sm w-full">
								<div className="overflow-x-auto">
									{history.length === 0 ? (
										<div className="p-8 text-center text-[rgba(55,50,47,0.60)] font-sans">
											No search history yet. Start
											searching to see your queries here.
										</div>
									) : (
										<table className="w-full">
											<thead>
												<tr className="border-b border-[rgba(55,50,47,0.12)]">
													<th className="text-left py-2 px-3 text-sm font-semibold text-[#37322F] font-sans">
														Query
													</th>
													<th className="text-left py-2 px-3 text-sm font-semibold text-[#37322F] font-sans">
														Engine
													</th>
													<th className="text-left py-2 px-3 text-sm font-semibold text-[#37322F] font-sans">
														Time
													</th>
													<th className="text-left py-2 px-3 text-sm font-semibold text-[#37322F] font-sans">
														Action
													</th>
												</tr>
											</thead>
											<tbody>
												{history.map((item, index) => (
													<tr
														key={index}
														className="border-b border-[rgba(55,50,47,0.06)] hover:bg-white hover:bg-opacity-50 transition-colors duration-200">
														<td className="py-2 px-3 text-sm text-[#37322F] font-sans max-w-[32rem] truncate">
															{item.query}
														</td>
														<td className="py-2 px-3 text-sm text-[rgba(55,50,47,0.80)] font-sans">
															{item.engine}
														</td>
														<td className="py-2 px-3 text-sm text-[rgba(55,50,47,0.60)] font-sans">
															{(() => {
																const date = new Date(item.timestamp);
																const day = date.getDate();
																const month = date.toLocaleString('en-US', { month: 'long' });
																const year = date.getFullYear();

																const getOrdinalSuffix = (day: number) => {
																	if (day >= 11 && day <= 13) return 'th';
																	switch (day % 10) {
																		case 1: return 'st';
																		case 2: return 'nd';
																		case 3: return 'rd';
																		default: return 'th';
																	}
																};

																return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
															})()}
														</td>
														<td className="py-2 px-3">
															<button
																onClick={() =>
																	copyToClipboard(
																		item.query
																	)
																}
																className="text-xs px-2 py-1 bg-white border border-[rgba(55,50,47,0.12)] rounded text-[#37322F] hover:shadow-[0px_1px_2px_rgba(55,50,47,0.12)] transition-shadow duration-200 cursor-pointer">
																Copy Query
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{toastMessage && (
					<motion.div
						key="copied-toast"
						initial={{ y: 20, opacity: 0, scale: 0.98 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 10, opacity: 0, scale: 0.99 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 30,
							duration: 0.25,
						}}
						className="fixed bottom-6 left-1/2 -translate-x-1/2 px-3 py-2 rounded-full bg-[#37322F] text-white text-xs shadow-[0_2px_10px_rgba(0,0,0,0.12)] pointer-events-none"
						aria-live="polite">
						{toastMessage}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
