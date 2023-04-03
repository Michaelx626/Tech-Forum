const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blogger) => blogger.get({ plain: true }));
    blogs.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

    res.render("homepage", { blogs, logged_in: req.session.logged_in });
  } catch (error) {
    console.error(error);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const postData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: { project_id: req.params.id },
      include: { model: User },
    });

    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    comments.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );

    console.log(comments);

    res.render('comment', {
      post,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const usersData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });
    
    const users = usersData.get({ plain: true });
    users.projects.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    
    res.render('dashboard', { users, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in){
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/logout', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/edit/:id', withAuth, async (req, res) => {
    res.render('edit', { logged_in: req.session.logged_in });
});

router.get('/create', (req, res) => {
  res.render('create', { logged_in: req.session.logged_in });
});

module.exports = router;
