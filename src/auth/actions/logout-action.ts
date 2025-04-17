import { logout } from "@/auth/service/auth";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const logoutActionSchema = z
	.object({
		userId: z.string().uuid(), // Validação para garantir que seja um UUID
	})
	.required();

export const logoutAction = actionClient
	.schema(logoutActionSchema)
	.action(async ({ parsedInput: { userId } }) => {
		const response = await logout(userId);
		return response;
	});
