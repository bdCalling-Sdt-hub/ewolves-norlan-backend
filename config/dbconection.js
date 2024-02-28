const mongoose=require("mongoose")

const dbconection = async(DB_URL) => {
    try {
        const DB_OPTIONS = {
            dbName:"norlan"
        }
        await mongoose.connect(DB_URL, DB_OPTIONS);
        console.log("database connected")
    } catch (error) {
        console.log("all is wrong")
        console.log(error);
    }
}

module.exports=dbconection