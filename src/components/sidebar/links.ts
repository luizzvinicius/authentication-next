import { House, LayoutDashboard, Users } from "lucide-react";

export interface Link {
	url: string;
	icon: React.ElementType;
	title: string;
}
export const links: Link[] = [
	{
		url: "/",
		icon: House,
		title: "Início",
	},
	{
		url: "/dashboard",
		icon: LayoutDashboard,
		title: "Dashboard",
	},
	{
		url: "/dashboard/users",
		icon: Users,
		title: "Usuários",
	},
];
