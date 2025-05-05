"use server";
import { login } from "@/auth/service/auth";
import { actionClient } from "@/lib/safe-action";
import { createSession } from "@/lib/session";
import { z } from "zod";

const loginActionSchema = z
	.object({
		email: z.string().email(),
		password: z.string(),
	})
	.required();

export const loginAction = actionClient
	.schema(loginActionSchema)
	.action(async ({ parsedInput: data }) => {
		const response = await login(data);
		// console.log(response.headers["set-cookie"]?.at(0)?.split("=")[1]);
		await createSession(
			response.access_token,
			response.expires_in,
			response.refresh_token,
			response.refresh_expires_in,
		);
		// console.log(response.data);

		return response;
	});
