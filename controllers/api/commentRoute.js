const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      body: req.body.body,
      user_id: req.session.user_id,
      project_id: +req.body.project_id,
    });

    res.status(200).json(commentData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;