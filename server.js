const express = require("express");
const sequelize = require("./config/db");

const app = express();
const PORT = 8000;

// conectar base de datos
if(sequelize){
    sequelize
      .sync({ foce: false })
      .then(() => {
        app.listen(PORT, ()=>{
            console.clear()
            console.log("Server running on http://localhost:"+PORT)
            console.log("hot reload is working 👍")
        })
      })
      .catch((error) => {
        console.clear();
        console.error(error);
        console.log("Could not connect database 💀❌");
      });
}else{
    console.clear()
    console.log("WRANING!!!")
    console.log("DB_URL is not set")
    console.log("please configure you environment variables correctly")
}