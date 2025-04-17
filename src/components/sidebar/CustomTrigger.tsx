"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export function CustomTrigger() {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			type="button"
			onClick={toggleSidebar}
			className=" flex justify-center items-center size-8 "
		>
			<Menu />
		</button>
	);
}
