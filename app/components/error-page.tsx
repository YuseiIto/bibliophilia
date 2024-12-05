import {
	NavLink,
	RouteErrorResponse,
	isRouteErrorResponse,
} from "@remix-run/react";
import logo from "~/assets/logo.png";

type RouteErrorProps = {
	error: RouteErrorResponse;
};

function RouteError({ error }: RouteErrorProps) {
	return (
		<div className="flex flex-row gap-8 items-center justify-center">
			<div>
				<h1 className="font-bold text-9xl">{error.status}</h1>
			</div>
			<div>
				<p className="font-bold text-6xl">{error.statusText}</p>
			</div>
		</div>
	);
}

type ErrorPageProps = {
	error: Error | RouteErrorResponse;
};

export function ErrorPage({ error }: ErrorPageProps) {
	console.log(error);
	return (
		<main className="flex flex-col p-8 h-screen justify-center">
			<div className="flex flex-col w-full items-center">
				{isRouteErrorResponse(error) ? (
					<RouteError error={error} />
				) : (
					<p> {error} </p>
				)}
				<div className="max-w-[300px]">
					<NavLink to="/">
						<img src={logo} alt="Bibliophilia" />
					</NavLink>
				</div>
			</div>
		</main>
	);
}
