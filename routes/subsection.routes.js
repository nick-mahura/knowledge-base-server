const { Router } = require("express");
const SubSection = require("../models/SubSection");
const auth = require("../middleware/auth.middlaware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { name, section } = req.body;

    const subSection = new SubSection({
      name,
      section,
    });

    await subSection.save();
    res.status(201).json({ name, section });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { sectionName } = req.body;

    const subSections = await SubSection.find({ section: sectionName });
    res.json(subSections);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const { subSectionId } = req.body;
    console.log("subSectionId", subSectionId);
    const subSections = await SubSection.remove({ _id: subSectionId });
    res.json(subSections);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;
