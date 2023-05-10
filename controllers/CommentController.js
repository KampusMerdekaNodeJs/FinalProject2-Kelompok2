const { Comment, User, Photo } = require("../models");

class CommentController {
  static async GetAllComment(req, res) {
    try {
      const comments = await Comment.findAll({
        include: [{ model: User }, { model: Photo }],
      });
      if (comments) {
        return res.status(201).json({ comments });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  static CreateComment(req, res) {
    const { PhotoId, comment } = req.body;
    const UserId = res.locals.user.id;

    Comment.create({
      UserId,
      PhotoId,
      comment,
    })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async UpdateOnCommentById(req, res) {
    try {
      const id = req.params.id;
      const { comment } = req.body;

      const commentUpdated = await Comment.update(
        { comment },
        { where: { id }, returning: true }
      );

      console.log(commentUpdated);
      if (commentUpdated[0] == 1) {
        return res.status(200).json({ comment: commentUpdated });
      } else {
        return res.status(500).json({ message: `id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static DeleteById(req, res) {
    const id = req.params.id;

    Comment.destroy({
      where: {
        id: id,
      },
    })
      .then((result) => {
        if (result) {
          return res
            .status(200)
            .json({ message: `Your comment has been successfully deleted` });
        } else {
          return res.send("Data not found");
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = CommentController;
