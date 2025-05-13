import { connect } from "mongoose";

export const connectDatabase = async () => {
  const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;

  if (!dbConnectionString) throw new Error("Failed  connect to the MONGODB");

  try {
    await connect(dbConnectionString);

    console.log("Successfully connected to the MONGODB");
  } catch (error) {
    console.error(error instanceof Error && error.message);
  }
};
