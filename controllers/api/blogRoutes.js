const router = require("express").Router();
const { Blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.userTitle,
      description: req.body.userContent,
      user_id: req.session.user_id,
    });
    console.log(req.body);
    console.log(newBlog);

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByPk(req.body.project_id);

    updatedBlog.title = req.body.updateTitle;
    updatedBlog.description = req.body.updateContent;
    await updatedBlog.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.delete('/', withAuth, async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.body.project_id }});
    
    res.status(200).json({ message: `Deleted!`});
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
