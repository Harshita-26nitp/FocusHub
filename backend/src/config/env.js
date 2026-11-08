import dotenv from "dotenv";
dotenv.config();
const env={
    PORT:process.env.PORT||8000,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV||"development",
    AUTH_COOKIE_NAME:process.env.AUTH_COOKIE_NAME||"focushub_token",
};
export default env;
