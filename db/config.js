const mongoose = require("mongoose");

const dbConnection = async () => {
  console.log(process.env.BD_CNN);
  try {
    await mongoose.connect(
      process.env.BD_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        console.log("Connected to MongoDB!!!");
      }
    );
    console.log("Base de datos online");
  } catch (err) {
    console.log(err + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    throw new Error("Error a la hora de inicializad DB");
  }
};

module.exports = {
  dbConnection,
};
