import mongoose from "mongoose";

const connectDB = async () => {
    const MONGO_URI = 'mongodb+srv://<databasename>:<password>@goalsettercluster.hdxq0c5.mongodb.net/goalsetterapp?retryWrites=true&w=majority';

    try {
        const conn = await mongoose.connect(MONGO_URI)

        console.log(`MongoDB connected: ${conn.connection.host}`)
        
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

export { connectDB }