import { ActionFunction, redirect, json } from "@remix-run/cloudflare";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const isbn = formData.get("isbn");

	if (typeof isbn !== "string" || isbn.length === 0) {
		return json({ errors: { title: "ISBN is required" } }, { status: 422 });
	}

	console.log(`ISBN: ${isbn}`);
	return redirect(`/`);
};
