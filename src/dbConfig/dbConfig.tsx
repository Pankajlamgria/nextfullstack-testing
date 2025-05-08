import mongoose from "mongoose";

export function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Data base connected successfully");
        })
        connection.on('error', () => {
            console.log("Error occured while connecting to mongodb");
        })
    }
    catch (error) {
        console.log("Some error occured");
        console.log(error);
    }
}