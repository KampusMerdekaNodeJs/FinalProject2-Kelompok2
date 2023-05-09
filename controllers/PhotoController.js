const {Photo, User} = require('../models')
class PhotoController{
    static GetAllPhotos(req,res){
        Photo.findAll({
            include: User
        })
        .then(result =>{
            res.status(200).json(result);
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    }
    static CreatePhoto(req,res){
        const { title, caption, poster_image_url,UserId}= req.body;
        const user = res.locals.user
        Photo.create({
            title,
            caption,
            poster_image_url,
            UserId,
        }).then (result=>{
            res.status(201).json(result)
        }).catch(err=>{
            res.status(500).json(err)
            console.log(err)
        })
    }
    static GetOnePhotoById(req, res) {
        const id = req.params.id;
    
        Photo.findByPk(id)
          .then((photo) => {
            if (!photo) {
              res.status(404).json({ message: 'Photo not found' });
            } else {
              res.status(200).json(photo);
            }
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
          });
      }
      static UpdateOnPhotoById(req, res) {
        const id = +req.params.id;
        const { title, caption, image_url } = req.body;
      
        Photo.update(
          { title, caption, image_url },
          { where: { id }, returning: true }
        )
          .then(([rowsUpdated, [updatedPhoto]]) => {
            if (rowsUpdated !== 1) {
              return res.status(500).json({ message: 'Something went wrong.' });
            }
      
            res.status(200).json(updatedPhoto);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
      static DeleteById(req, res) {
        const id = req.params.id;
    
        Photo.destroy({
          where: {
            id: id
          }
        })
          .then(() => {
            res.status(200).json({ message: `Photo with id ${id} has been deleted` });
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
      
}
    module.exports = PhotoController