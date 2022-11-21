// 啟用 express
const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

// http://localhost:3001/api/insert
router.post("/insert", async (req, res) => {
  let [result] = await pool.execute(
    `INSERT INTO list (text,code)  VALUES (?,?)`,
    [req.body.text, req.body.id]
  );
  // let [result] = await pool.execute(
  //   `INSERT INTO count (name,vote_place) VALUES (?,?)`,
  //   [req.body.name, req.body.place]
  // );
});
// http://localhost:3001/api
router.get("/", async (req, res) => {
  let [result] = await pool.execute(
    `SELECT * FROM list ORDER BY list.code DESC `
  );
  res.json(result);
});
// http://localhost:3001/api/change
router.patch("/api/change", async (req, res) => {
  let [result] = await pool.execute(`UPDATE list SET text=? WHERE id=? `, [
    req.body.text,
    req.body.id,
  ]);

  res.json(result);
});

// http://localhost:3001/api/delete
router.delete(`/api/delete`, async (req, res) => {
  let [result] = await pool.execute(`DELETE FROM list WHERE id=?`, [
    req.body.id,
  ]);

  res.json(result);
  console.log("id", req.body.id);
});

// 匯出給別人用
module.exports = router;
