import { Platform } from "react-native";
const liveHost = "https://us-central1-mealstogo-10b5e.cloudfunctions.net";

const localHost = "http://127.0.0.1:5001/mealstogo-10b5e/us-central1";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = false;

// export const host = !isDevelopment || isAndroid ? liveHost : localHost;

export const host = liveHost;
