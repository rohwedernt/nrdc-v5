import './src/db/envConfig.ts';
import { defineConfig } from 'drizzle-kit';
 
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
