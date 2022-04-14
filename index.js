const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}. Have a great day!`);
});

const login = [
  {
    mail: "gerson@technomancers.cl",
    pass: "123",
  },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/css", express.static("public/css"));
app.use("/jquery", express.static("node_modules/jquery/dist"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    const user = login.find((u) => u.mail === email && u.pass === password);
    if (user) {
        res.send("Welcome");
    } else {
        res.send("Wrong credentials");
    }
});
