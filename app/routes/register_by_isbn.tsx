import { ActionFunction, redirect, data } from "react-router";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const isbn = formData.get("isbn");

	if (typeof isbn !== "string" || isbn.length === 0) {
		return data({ errors: { title: "ISBN is required" } }, { status: 422 });
	}

	console.log(`ISBN: ${isbn}`);
	return redirect(`/`);
};
