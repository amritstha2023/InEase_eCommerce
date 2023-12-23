import mongoose from "mongoose";

const db = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "InEase",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default db;