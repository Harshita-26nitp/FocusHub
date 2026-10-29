import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
    console.log("➡️ connectDB called");
    console.log("URI exists:", !!env.MONGODB_URI);

    try {
        const connection = await mongoose.connect(env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;