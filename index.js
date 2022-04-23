const express = require("express");
const app = express();
const port = 3000;
const { getLogin } = require("./public/js/queries");
const jwt = require("jsonwebtoken");
const secretKey = "secret";

app.listen(port, () => {
  console.log(`Listening on port: ${port}. Have a great day!`);
});

// const login = [
//   {
//     mail: "gerson@technomancers.cl",
//     pass: "123",
//   },
// ];

app.use(express.json());

app.use(express.static("public"));

app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/css", express.static("public/css"));
app.use("/jquery", express.static("node_modules/jquery/dist"));
app.use("/js", express.static("public/js"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getLogin(email, password);
  if (user) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 200,
        data: user,
      },
      secretKey
    );
    res.send(token);
  } else {
    res.status(401).send({
      error: "Usuario o contraseña incorrectos",
      code: 401,
    });
  }
});

app.get("/data", (_req, res) => {
  res.sendFile(__dirname + "/public/data.html");
});
