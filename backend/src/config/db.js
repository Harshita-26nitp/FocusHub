import mongoose from "mongoose";
import env from "./env.js";

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const connectDB = async () => {
    console.log("➡️ connectDB called");
    console.log("URI exists:", Boolean(env.MONGODB_URI));

    mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB disconnected. Mongoose will attempt to reconnect.");
    });

    mongoose.connection.on("reconnected", () => {
        console.log("✅ MongoDB reconnected");
    });

    let attempt = 0;

    while (mongoose.connection.readyState !== 1) {
        try {
            const connection = await mongoose.connect(env.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                maxPoolSize: 10,
                retryWrites: true,
            });

            console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
            return connection;
        } catch (error) {
            attempt += 1;
            const delay = Math.min(30000, 2000 * attempt);
            console.error(`❌ MongoDB connection attempt ${attempt} failed: ${error.message}`);
            console.log(`Retrying MongoDB connection in ${delay / 1000}s...`);
            await wait(delay);
        }
    }

    return mongoose.connection;
};

export default connectDB;
