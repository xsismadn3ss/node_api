// Suggested code may be subject to a license. Learn more: ~LicenseLog:404940320.
const express = require("express");
const router = express.Router();

/** 
 @swagger
 * /:
 *   get:
 *     summary: Returns a hello world message.
 *     responses:
 *       200:
 *         description: A successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: hello world
*/
router.get("/", (req, res) => {
  console.log("GET:/");
  res.status(200).json({ details: "hello world" });
});

async function checkcases({ nombre, edad }) {
  const errors = {};

  // if (!nombre) {
  //   errors.nombre = "nombre is required";
  // }

  // if (!edad) {
  //   errors.edad = "edad is required";
  // }

  if (Object.keys(errors).length > 0) {
    console.log(`error: ${Object.values(errors).join(', ')}`);
    return { code: 400, data: errors };
  }
  
  else {
    console.log(`data received succesfully nombre:${nombre} edad:${edad}`)
    return {
      code: 200,
      data: {
        details: 'data received succesfully',
        nombre: nombre,
        edad: edad
      }
    } 
  }
}

/**
 * @swagger
 * /:
 *   post:
 *     summary: Receive data in a POST request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A successful response.
 */
router.post("/", async (req, res) => {
  const { nombre, edad } = req.body;
  console.log("POST:/");
  const { code, data } = await checkcases({ nombre, edad });
  if (code) {
    return res.status(code).json({
      data
    });
  }
});

module.exports = router;
