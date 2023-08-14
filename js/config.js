import { config } from "dotenv";
config();

const { PORT, MONGODB_URI } = process.env;

export { PORT, MONGODB_URI };
