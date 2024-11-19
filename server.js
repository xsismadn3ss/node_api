const express = require("express");
const sequelize = require("./config/db");

// importar rutas
const homeRoutes = require("./routes/home");
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// middlewares
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandles");

const app = express();
const PORT = 8000;

// configurar parseo
app.user(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// registrar ruta
app.use("/", homeRoutes);
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// registrar Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// conectar base de datos
if (sequelize) {
  sequelize
    .sync({ foce: false })
    .then(() => {
      app.listen(PORT, () => {
        console.log("Server running on http://localhost:" + PORT);
        console.log("hot reload is working 👍");
      });
    })
    .catch((error) => {
      console.error(error);
      console.log("Could not connect database 💀❌");
    });
} else {
  console.log("WRANING!!!");
  console.log("DB_URL is not set");
  console.log("please configure you environment variables correctly");
}
