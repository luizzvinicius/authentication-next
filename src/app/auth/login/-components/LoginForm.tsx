"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { loginAction } from "@/auth/actions/login-action";
import { useAction } from "next-safe-action/hooks";

const loginFormSchema = z
	.object({
		email: z
			.string()
			.email("Email inválido")
			.nonempty("Email é obrigatório")
			.max(255, "Email deve ter no máximo 255 caracteres"),
		password: z.string(),
		// .min(4, "Senha deve ter no mínimo 4 caracteres")
		// .max(255, "Senha deve ter no máximo 255 caracteres")
		// .refine(value => {
		// 	const hasLetter = /[a-zA-Z]/.test(value);
		// 	const hasNumber = /\d/.test(value);
		// 	return hasLetter && hasNumber;
		// }, "Senha deve conter pelo menos uma letra e um número"),
	})
	.required();

export function LoginForm() {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { executeAsync, isPending } = useAction(loginAction);
	async function onSubmit(data: z.infer<typeof loginFormSchema>) {
		const result = await executeAsync(data);
		console.log(result);
	}

	const [passwordVisible, setPasswordVisible] = useState({
		input: "password",
		visible: false,
	});

	return (
		<div className="flex flex-col gap-y-2 w-100 h-64">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl">Email</FormLabel>
								<div className="relative">
									<Mail className="absolute left-1 top-1/2 transform -translate-y-1/2" />
									<FormControl>
										<Input
											type="email"
											placeholder="Email"
											className="pl-8"
											{...field}
										/>
									</FormControl>
								</div>
								<span className="text-sm text-red-500">
									{form.formState?.errors?.email?.message}
								</span>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl">Senha</FormLabel>
								<FormControl>
									<div className="relative">
										<Lock className="absolute left-1 top-1/2 transform -translate-y-1/2" />
										<Input
											type={passwordVisible.input}
											placeholder="Senha"
											className="pl-8"
											{...field}
										/>
										<Eye
											className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
												passwordVisible.visible ? "block" : "hidden"
											}`}
											onClick={() =>
												setPasswordVisible({
													input: "password",
													visible: false,
												})
											}
										/>
										<EyeOff
											className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
												passwordVisible.visible ? "hidden" : "block"
											}`}
											onClick={() =>
												setPasswordVisible({
													input: "text",
													visible: true,
												})
											}
										/>
									</div>
								</FormControl>
								<span className="text-sm text-red-500">
									{form.formState?.errors?.password?.message}
								</span>
							</FormItem>
						)}
					/>
					<div className="flex justify-center mt-auto">
						<Button type="submit" className="w-[90%]">
							Login
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
