import type { CSSProperties } from "react";

export function LogoType() {
	const logoTypeStyle: CSSProperties = {
		fontFamily:
			'Futura, ui-sans-serif,"-apple-system", Helvetica, Jost, sans-serif',
		fontOpticalSizing: "auto",
		fontWeight: 500,
		fontStyle: "normal",
	};

	return (
		<span className="logo-type text-xl ml-3 font-[]" style={logoTypeStyle}>
			Bibliophilia
		</span>
	);
}
