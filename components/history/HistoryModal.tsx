"use client";

import { useState, useEffect } from "react";
import {
	getSearchHistory,
	clearSearchHistory,
	type SearchHistoryItem,
} from "@/lib/searchHistory";

interface HistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
	const [history, setHistory] = useState<SearchHistoryItem[]>([]);

	useEffect(() => {
		let mounted = true;
		if (isOpen) {
			(async () => {
				const items = await getSearchHistory();
				if (mounted) setHistory(items);
			})();
		}
		return () => {
			mounted = false;
		};
	}, [isOpen]);

	const handleClearHistory = async () => {
		await clearSearchHistory();
		setHistory([]);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-[#F7F5F3] rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
				<div className="p-6 border-b border-[rgba(55,50,47,0.12)]">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold text-[#37322F] font-sans">
							Search History
						</h2>
						<div className="flex gap-2">
							<button
								onClick={handleClearHistory}
								className="px-3 py-1 text-sm text-[rgba(55,50,47,0.70)] hover:text-[#37322F] font-medium transition-colors duration-200">
								Clear All
							</button>
							<button
								onClick={onClose}
								className="px-3 py-1 bg-white border border-[rgba(55,50,47,0.12)] rounded-full text-sm font-medium text-[#37322F] hover:shadow-[0px_2px_4px_rgba(55,50,47,0.12)] transition-shadow duration-200">
								Close
							</button>
						</div>
					</div>
				</div>

				<div className="overflow-y-auto max-h-[60vh]">
					{history.length === 0 ? (
						<div className="p-8 text-center text-[rgba(55,50,47,0.60)] font-sans">
							No search history yet. Start searching to see your
							queries here.
						</div>
					) : (
						<div className="p-4">
							<div className="overflow-x-auto">
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
												<td className="py-2 px-3 text-sm text-[#37322F] font-sans max-w-xs truncate">
													{item.query}
												</td>
												<td className="py-2 px-3 text-sm text-[rgba(55,50,47,0.80)] font-sans">
													{item.engine}
												</td>
												<td className="py-2 px-3 text-sm text-[rgba(55,50,47,0.60)] font-sans">
													{new Date(
														item.timestamp
													).toLocaleString()}
												</td>
												<td className="py-2 px-3">
													<button
														onClick={() =>
															copyToClipboard(
																item.query
															)
														}
														className="text-xs px-2 py-1 bg-white border border-[rgba(55,50,47,0.12)] rounded text-[#37322F] hover:shadow-[0px_1px_2px_rgba(55,50,47,0.12)] transition-shadow duration-200">
														Copy
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
