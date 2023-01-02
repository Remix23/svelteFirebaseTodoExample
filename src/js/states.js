import { writable } from "svelte/store";

// managed by the app, loaded from the firestore or the local storage

export const todos = writable([]);