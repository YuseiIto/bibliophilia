import type { LinksFunction } from "@remix-run/cloudflare";
import type { ReactNode } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { ErrorPage } from "~/components/error-page";
import { Toaster } from "~/components/ui/toaster";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap",
	},
];

export function ErrorBoundary() {
	return (
		<>
			<ErrorPage />
			<Scripts />
		</>
	);
}

export function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<Toaster />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
