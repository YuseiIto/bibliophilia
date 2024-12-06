import { drizzle } from "drizzle-orm/d1";
import { bibWorksTable } from "./schema";
import { Work } from "./work";

export class Repository {
	private _con;

	constructor(env: Env) {
		if (!env.DB) throw new Error("DB is not defined");
		this._con = drizzle(env.DB);
	}

	async insertWork(work: Work) {
		await this._con.insert(bibWorksTable).values(work);
	}
}
