import mongoose from 'mongoose'

mongoose.set("strictQuery", true)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {})
        console.log('MongoDB connected:'.cyan.bold + ' ' + conn.connection.host.cyan)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB