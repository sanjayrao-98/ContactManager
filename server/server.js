import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (req, res) => {
  console.log("Request received");
  const sql = "SELECT * FROM contacts";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Message: "Error inside server" });
    }
    res.json(result);
  });
});

app.get("/read/:ID", (req, res) => {
  console.log("Request received");
  const sql = "SELECT * FROM contacts WHERE ID = ?";
  const id = req.params.ID;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Message: "Error inside server" });
    }
    res.json(result);
  });
});

app.post("/Student", (req, res) => {
  const sql = "INSERT INTO contacts (`Name`,`Email`,`Phone_No`) Values(?)";
  const values = [req.body.Name, req.body.Email, req.body.Phone_No];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.put("/update/:ID", (req, res) => {
  const sql =
    "UPDATE contacts SET `Name`=? , `Email`= ?, `Phone_No`=?  WHERE ID=?";
  const id = req.params.ID;
  db.query(
    sql,
    [req.body.Name, req.body.Email, req.body.Phone_No, id],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

app.delete("/delete/:ID", (req, res) => {
  const sql = "DELETE FROM contacts WHERE ID=?";
  const id = req.params.ID;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listening");
});
