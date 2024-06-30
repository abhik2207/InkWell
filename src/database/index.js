import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionURL = 'mongodb://127.0.0.1:27017/inkwell';

    mongoose
        .connect(connectionURL)
        .then(() => {
            console.log('--- CONNECTED TO DATABASE SUCCESSFULLY! ---')
        })
        .catch((err) => {
            console.log(err);
        });
}

export default connectToDB;
