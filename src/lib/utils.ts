import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { activeGuildStore } from '$lib/stores';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const syncActiveGuild = async () => {
	activeGuildStore.set(
		JSON.parse(localStorage.getItem('activeGuild') as string),
	);
	activeGuildStore.subscribe((value) => {
		localStorage.setItem('activeGuild', JSON.stringify(value));
	});
};