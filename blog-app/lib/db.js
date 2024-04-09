import mongoose from "mongoose";

export default async function connectToDB() {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST } = process.env;
  await mongoose
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`)
    .then(() =>
      console.info(`%cSuccessfully connected to mongodb`, "color: blue"),
    )
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
