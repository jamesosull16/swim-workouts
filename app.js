require("dotenv").config();
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

let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "swim_workoutsDB",
  });
}
connection.connect((err) => {
  if (err) {
    console.error(`Error Connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected as ID ${connection.threadId}`);
});

//root route
app.get("/", (req, res) => {
  connection.query("SELECT * FROM workouts;", (err, data) => {
    if (err) {
      return res.status(500).end();
    }
    res.render("index", { workouts: data });
  });
});

//selecting the workout to complete
app.get("/:id?", (req, res) => {
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

//adding a workout
app.post("/api/workouts", (req, res) => {
  connection.query(
    "INSERT INTO workouts (distance, category, wu, ms, cd) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.distance,
      req.body.category,
      req.body.wu,
      req.body.ms,
      req.body.cd,
    ],
    (err, result) => {
      console.log(result);
      console.log(err);
      if (err) {
        return res.status(500).end();
      }
      console.log({ id: result.insertId });
      res.json({ id: result.insertId });
    }
  );
});

//searching a workout by category
app.get("/api/:category", (req, res) => {
  connection.query(
    "SELECT * FROM workouts WHERE category = ?",
    [req.params.category],
    (err, result) => {
      console.log(result);
      console.log(err);
      if (err) {
        return res.status(500).end();
      }
      res.render("searched-workout", result[0]);
    }
  );
});

//delete a workout
app.delete("/api/workouts/:id", (req, res) => {
  connection.query(
    "DELETE FROM workouts WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        //sending generic server failures if an error occurs
        return res.status(500).end();
      }
      //if no rows were changed then ID must not exist so sending a 404 - not found
      if (result.affectedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);
