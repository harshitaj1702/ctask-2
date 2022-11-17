var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get("/", function (req, res) {
  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
    const obj = {};
    data.map((item) => {
      const key = item.path.split("/");
      if (!obj[key[2]]) {
        obj[key[2]] = [];
      }
      obj[key[2]].push({ ...item, name: key[3] });
    });
    res.json({ status: true, data: obj });
  } catch (err) {
    res.json({ status: false });
  }
});

module.exports = router;
