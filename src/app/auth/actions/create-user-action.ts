import { createUser, RoleEnum } from "@/app/auth/service/auth";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const createUserActionSchema = z
	.object({
		name: z.string().min(4).max(255),
		email: z.string().email(),
		password: z.string().min(5).max(255),
		cpf: z.string().length(11),
		role: z.nativeEnum(RoleEnum),
	})
	.required();

export const createUserAction = actionClient
	.schema(createUserActionSchema)
	.action(async ({ parsedInput: data }) => {
		const response = await createUser(data);
		return response;
	});
