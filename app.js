const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.use(express.static(path.join(__dirname, "/")));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Blessing@16",
  database: "swim_workoutsDB",
});
connection.connect((err) => {
  if (err) {
    console.error(`Error Connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected as ID ${connection.threadId}`);
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM workouts;", (err, data) => {
    if (err) {
      return res.status(500).end();
    }
    res.render("index", { workouts: data });
  });
});

app.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM workouts WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) {
        return res.status(500).end();
      }
      console.log(data);
      res.render("single-workout", data[0]);
    }
  );
});

app.post("/api/workouts", (req, res) => {
  connection.query(
    "INSERT INTO workouts (dist, cat, wu, ms, cd) VALUES (?, ?, ?, ?, ?)",
    [req.body.dist, req.body.cat, req.body.wu, req.body.ms, req.body.cd],
    (err, result) => {
      if (err) {
        return res.status(500).end();
      }
      res.json({ id: result.insertId });
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);