import mongoose from "mongoose"

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log("database is connected succesfully")
    } catch (error) {
        console.log("database is not connected")
    }
}
export default connectDb;