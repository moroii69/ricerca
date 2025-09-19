export interface SearchEngine {
	name: string;
	url: string;
	color: string;
	shortcut: string;
}

export const searchEngines: SearchEngine[] = [
	{
		name: "Google",
		url: "https://www.google.com/search?q=",
		color: "bg-blue-500",
		shortcut: "⌘1",
	},
	{
		name: "Bing",
		url: "https://www.bing.com/search?q=",
		color: "bg-green-500",
		shortcut: "⌘2",
	},
	{
		name: "DuckDuckGo",
		url: "https://duckduckgo.com/?q=",
		color: "bg-orange-500",
		shortcut: "⌘3",
	},
	{
		name: "Brave",
		url: "https://search.brave.com/search?q=",
		color: "bg-orange-600",
		shortcut: "⌘0",
	},
	{
		name: "Yahoo",
		url: "https://search.yahoo.com/search?p=",
		color: "bg-purple-500",
		shortcut: "⌘4",
	},
	{
		name: "Yandex",
		url: "https://yandex.com/search/?text=",
		color: "bg-red-500",
		shortcut: "⌘5",
	},
	{
		name: "Baidu",
		url: "https://www.baidu.com/s?wd=",
		color: "bg-blue-600",
		shortcut: "⌘6",
	},
];

export const additionalSearchEngines: SearchEngine[] = [
	{
		name: "Startpage",
		url: "https://www.startpage.com/sp/search?query=",
		color: "bg-indigo-500",
		shortcut: "⌘7",
	},
	{
		name: "Searx",
		url: "https://searx.org/?q=",
		color: "bg-gray-500",
		shortcut: "⌘8",
	},
];
