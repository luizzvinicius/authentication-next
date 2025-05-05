"use server";
import { logout } from "@/auth/service/auth";
import { actionClient } from "@/lib/safe-action";
import { deleteSession } from "@/lib/session";
import { z } from "zod";

const logoutActionSchema = z
	.object({
		userId: z.string(),
	})
	.required();

export const logoutAction = actionClient
	.schema(logoutActionSchema)
	.action(async ({ parsedInput: { userId } }) => {
		const response = await logout(userId);
		await deleteSession();
		return response;
	});
