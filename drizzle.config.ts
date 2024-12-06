import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if(process.env.LOCAL_DB_URL){
  console.info("[INFO] Drizzle is running with local configuration")
}

const prodConfig = () => defineConfig({
  out: './drizzle',
  schema: './app/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACDCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});

const localConfig = () => defineConfig({
  out: './drizzle',
  schema: './app/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.LOCAL_DB_URL!,
  },
});

export default process.env.LOCAL_DB_URL ? localConfig() : prodConfig();
