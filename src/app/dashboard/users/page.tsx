"use client";
import { logoutAction } from "@/auth/actions/logout-action";
import { RoleEnum } from "@/auth/service/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAction } from "next-safe-action/hooks";

export default function DashboardUsers() {
	const { executeAsync, isPending, result } = useAction(logoutAction);

	async function onClick() {
		await executeAsync({ userId: "54ba3228-fc8d-481a-adfb-4cfd5cf5c79a" });
	}

	return (
		<div className="border border-green-500">
			<Button type="button" onClick={onClick}>
				logout
			</Button>
			<h1>lista de usuários</h1>
			<p>Essa é a página de usuários</p>

			<div className="flex">
				<Input type="text" placeholder="Buscar usuários" />
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Funções" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="todos" defaultChecked={true}>
							Todos
						</SelectItem>
						{Object.values(RoleEnum).map(role => (
							<SelectItem key={role} value={role}>
								{role.toLowerCase()}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Button type="button">Adicionar usuário</Button>
			</div>
		</div>
	);
}
