import SidebarCustom from "@/components/sidebar";
import { CustomTrigger } from "@/components/sidebar/CustomTrigger";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarProvider>
				<aside>
					<SidebarCustom />
				</aside>
				<main>
					<CustomTrigger />
					{children}
				</main>
			</SidebarProvider>
		</>
	);
}
