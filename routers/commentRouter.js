const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", CommentController.GetAllComment);
router.post("/", CommentController.CreateComment);
router.put("/:id", CommentController.UpdateOnCommentById);
router.delete("/:id", CommentController.DeleteById);

module.exports = router;
