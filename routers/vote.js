// 啟用 express
const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

//登入
// http://localhost:3001/api/vote/login
router.post("/login", async (req, res) => {
  let [result] = await pool.execute(
    'INSERT INTO cnt (name,vote_place_id) VALUES (?,?)',
    [req.body.name, req.body.place]
  );

  // console.log( `INSERT INTO count (name,vote_place_id) VALUES (?,?)`,
  // [req.body.name, req.body.place]);
});

// 取得票所
// http://localhost:3001/api/vote/vote_place
router.get("/vote_place", async (req, res) => {
  let [result] = await pool.execute(`SELECT * FROM vote_place `);
  res.json(result);
});

// http://localhost:3001/api/vote/cnt/patch
router.patch("/cnt/patch", async (req, res) => {
  let [result] = await pool.execute(`UPDATE cnt SET candidate_id=? WHERE id=? `, [
    req.body.text,
    req.body.id,
  ]);

  res.json(result);
});

//取得候選人/票所
// http://localhost:3001/api/vote/candidate
router.get("/candidate", async (req, res) => {
  let [result] = await pool.execute(`SELECT candidate.*,vote_place.constituency_id,vote_place.vote_name FROM candidate LEFT JOIN vote_place ON candidate.vote_place_id=vote_place.id `);
  res.json(result);
});

// http://localhost:3001/api/delete
// router.delete(`/api/delete`, async (req, res) => {
//   let [result] = await pool.execute(`DELETE FROM list WHERE id=?`, [
//     req.body.id,
//   ]);

//   res.json(result);
//   console.log("id", req.body.id);
// });

// 匯出給別人用
module.exports = router;
