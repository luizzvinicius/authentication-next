import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";

export const actionClient = createSafeActionClient({
	handleServerError(e) {
		// console.log("from safe action", e);
		if (e.response?.data) {
			return e.response.data;
		}
		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
});
