const router = require("express").Router();
const photo = require("./photoRouter");
const user = require("./userRouter");
const comment = require("./commentRouter");

router.use("/", user);
router.use("/", photo);
router.use("/comments", comment);

module.exports = router;
