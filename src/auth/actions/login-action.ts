import { login } from "@/auth/service/auth";
import { actionClient } from "@/lib/safe-action";
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
		const token = await login(data);
		return token;
	});
