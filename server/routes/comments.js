const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")

//create a post

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//show all posts
router.get("/:postId", async (req, res) => {
  Comment.find({postId: req.params.postId})
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json(err));
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.postId === req.body.postId) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json("the comment has been updated");
    } else {
      res.status(403).json("you can update only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.postId === req.body.postId) {
      await comment.deleteOne();
      res.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json("you can delete only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like comment

router.put("/:id/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.body.username)) {
      await comment.updateOne({ $push: { likes: req.body.username } });
      if (comment.dislikes.includes(req.body.username)) {
        await comment.updateOne({ $pull: { dislikes: req.body.username } });
      }
      // res.status(200).json("The post has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.username } });
      // res.status(200).json("The post has been  unliked");
    }
    res.status(200).json(await Comment.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

//dislike comment
router.put("/:id/dislike", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment.dislikes.includes(req.body.username)) {
      await comment.updateOne({ $push: { dislikes: req.body.username } });
      if (comment.likes.includes(req.body.username)) {
        await comment.updateOne({ $pull: { likes: req.body.username } });
      }
      // res.status(200).json("The comment has been disliked");
    } else {
      await comment.updateOne({ $pull: { dislikes: req.body.username } });
      // res.status(200).json("The post has been undisliked");
    }
    res.status(200).json(await Comment.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
