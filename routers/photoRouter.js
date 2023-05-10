const router = require("express").Router();
const PhotoController = require("../controllers/PhotoController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/photos", PhotoController.GetAllPhotos);
router.post("/photos/create", PhotoController.CreatePhoto);
router.get("/photos/:id", PhotoController.GetOnePhotoById);
router.put("/photos/:id", PhotoController.UpdateOnPhotoById);
router.delete("/photos/:id", PhotoController.DeleteById);
module.exports = router;
