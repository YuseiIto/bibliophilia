import { NavLink, isRouteErrorResponse } from "@remix-run/react";
import logo from "~/assets/logo.png";

function RouteError({ error }) {

  return (
    <div className="flex flex-row gap-8 items-center justify-center">
      <div><h1 className="font-bold text-9xl">{error.status}</h1></div>
      <div><p className="font-bold text-6xl">{error.statusText}</p></div>
    </div>
  )
}
export function ErrorPage({ error }) {

  console.log(error)
  return (<main className="flex flex-col p-8 h-screen justify-center">
    <div className="flex flex-col w-full items-center">
      {
        isRouteErrorResponse(error) ? <RouteError error={error} /> : <p> {error} </p>
      }
      <div className="max-w-[300px]">
        <NavLink to="/">
          <img src={logo} alt="Bibliophilia" />
        </NavLink>
      </div>
    </div>
  </main>
  );
}
