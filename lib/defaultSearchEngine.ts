import { searchEngines } from "./searchEngines";

const DEFAULT_SEARCH_ENGINE_KEY = "ricerca-default-search-engine";

export function getDefaultSearchEngine() {
	if (typeof window === "undefined") {
		return searchEngines[0]; // return Google as default on server-side
	}

	try {
		const stored = localStorage.getItem(DEFAULT_SEARCH_ENGINE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			// find the engine by name to ensure it still exists
			const engine = searchEngines.find(e => e.name === parsed.name);
			return engine || searchEngines[0];
		}
	} catch (error) {
		console.warn("Failed to load default search engine from localStorage:", error);
	}

	return searchEngines[0];
}

export function setDefaultSearchEngine(engineName: string) {
	if (typeof window === "undefined") {
		return;
	}

	try {
		const engine = searchEngines.find(e => e.name === engineName);
		if (engine) {
			localStorage.setItem(DEFAULT_SEARCH_ENGINE_KEY, JSON.stringify({
				name: engine.name,
				url: engine.url
			}));
		}
	} catch (error) {
		console.warn("Failed to save default search engine to localStorage:", error);
	}
}
