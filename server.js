const express = require("express");
const sequelize = require("./config/db");
const homeRoutes = require('./routes/home')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const app = express();
const PORT = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// conectar base de datos
if(sequelize){
    sequelize
      .sync({ foce: false })
      .then(() => {
        app.listen(PORT, ()=>{
            console.log("Server running on http://localhost:"+PORT)
            console.log("hot reload is working 👍")
        })
      })
      .catch((error) => {
        console.error(error);
        console.log("Could not connect database 💀❌");
      });
}else{
    console.log("WRANING!!!")
    console.log("DB_URL is not set")
    console.log("please configure you environment variables correctly")
}