"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const loginFormSchema = z
	.object({
		email: z
			.string()
			.email("Email inválido")
			.nonempty("Email é obrigatório")
			.max(255, "Email deve ter no máximo 255 caracteres"),
		password: z
			.string()
			.min(4, "Senha deve ter no mínimo 4 caracteres")
			.max(255, "Senha deve ter no máximo 255 caracteres")
			.refine(value => {
				const hasLetter = /[a-zA-Z]/.test(value);
				const hasNumber = /\d/.test(value);
				return hasLetter && hasNumber;
			}, "Senha deve conter pelo menos uma letra e um número"),
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

	function onSubmit(data: z.infer<typeof loginFormSchema>) {
		console.log("Form data", data);
	}

	const [passwordVisible, setPasswordVisible] = useState({
		input: "password",
		visible: false,
	});
	console.log(passwordVisible);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Email" {...field} />
							</FormControl>
							<span style={{ color: "red" }}>
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
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={passwordVisible.input}
										placeholder="Senha"
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
							<span style={{ color: "red" }}>
								{form.formState?.errors?.password?.message}
							</span>
						</FormItem>
					)}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
}
