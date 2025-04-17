import { LoginForm } from "@/app/auth/login/-components/LoginForm";

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold">Faça login na sua conta</h1>
			<LoginForm />
		</div>
	);
}
