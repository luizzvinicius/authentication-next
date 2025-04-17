import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { links } from "./links";

export default function SidebarCustom() {
	return (
		<div>
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Menu</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{links.map(link => (
									<SidebarMenuItem key={link.title}>
										<SidebarMenuButton asChild>
											<a href={link.url}>
												<link.icon />
												<span>{link.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</div>
	);
}
