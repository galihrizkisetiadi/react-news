import { Outlet } from "react-router";
import type { Route } from "../+types/root";

export default function IndexLayout({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<div className="border-b-2 border-gray-200 p-3">
				<img src="./newsapi.png" alt="Logo" className="h-20" />
			</div>
			<main className="p-14">
				<Outlet context={loaderData} />
			</main>
		</>
	);
}
