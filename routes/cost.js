const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getWallet, addMoneyToCategory, removeMoneyToCategory} = require("../controllers/cost");


router.get("/wallet", getWallet);
router.post("/add", addMoneyToCategory);
router.post("/remove", removeMoneyToCategory);



module.exports = router;
