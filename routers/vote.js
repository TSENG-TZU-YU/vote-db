// 啟用 express
const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

//計票
// 取得票所
// http://localhost:3001/api/vote/vote_place
router.get("/vote_place", async (req, res) => {
  let [result] = await pool.execute(`SELECT * FROM vote_place `);
  res.json(result);
});

//取得候選人/票所
// http://localhost:3001/api/vote/candidate
router.post("/candidate", async (req, res) => {
  let [result] = await pool.execute(
    `SELECT candidate.*,vote_place.constituency_id,vote_place.vote_name FROM candidate LEFT JOIN vote_place ON candidate.vote_place_id=vote_place.id WHERE vote_place.vote_name=?`,
    [req.body.votePlace]
  );

  res.json(result);
});

//更新
// http://localhost:3001/api/vote/cnt/patch
router.patch("/cnt/patch", async (req, res) => {
  let arr = req.body;
  try {
    for (let data of arr) {
      let result = await pool.execute(
        `UPDATE candidate SET cnt=?,number_of_votes=? WHERE vote_place_id=? && id=? `,
        [data.cnt, data.number_of_votes, data.vote_place_id, data.id]
      );
     
    }
    res.json("susses");
  } catch (err) {
    console.log("err", err);
  }
});

//查看排名
// http://localhost:3001/api/vote/ranking
router.get("/ranking", async (req, res) => {
  let [result] = await pool.execute(`SELECT * FROM candidate `);
  res.json(result);
});



// 匯出
module.exports = router;
