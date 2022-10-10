const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      // useCreateIndex:true,
      useUnifiedTopology: true,
      // useFindAndModify:false
    })
    .then((data) => {
      console.log(`connection successfull: ${data.connection.host}`);
    });
  // .catch((err)=>{
  //     console.log(err);
  // })
};

module.exports = connectDatabase;
