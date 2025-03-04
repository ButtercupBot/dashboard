import { writable, type Writable } from "svelte/store";

export const activeGuildStore = writable() as Writable<App.Guild | undefined>;
