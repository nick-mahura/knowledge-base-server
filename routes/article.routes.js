const { Router } = require("express");
const Article = require("../models/Article");
const auth = require("../middleware/auth.middlaware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { name, subSection } = req.body;

    const article = new Article({
      name,
      subSectionId,
    });

    await article.save();
    res.status(201).json({ name, section });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { subSectionId } = req.body;

    const articles = await Article.find({ subSectionId: subSectionId });

    res.json(articles);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;
