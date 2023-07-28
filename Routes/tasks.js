const express = require("express");
const router = express.Router();
const Notes = require("../modules/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
// using get request to fetch all notes from the database :: login required
router.get("/", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
});
// using post request to add a todo in the database :: login required
router.post(
  "/",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Enter a valid password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag, dueDate,priority } = req.body;
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        dueDate,
        priority,
        history: [
          {
            timestamp: Date.now(),
            action: "Task Created",
          },
        ],
      });
      let savedNotes = await note.save();
      res.send(savedNotes);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
);
// route-3:: update an existing todo::login required
router.put("/:id", fetchuser, async (req, res) => {
//   let { title, description, tag ,priority} = req.body;
  
  try {
    // console.log(req.body);
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(401).send("not available");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: req.body,$push:{history:{action:req.body.Action}} },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// // deleteting an existiing node using delete request :: login required
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(401).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "your notes have been deleted successfully", note });
  } catch (error) {
    res.status(500).send(req.user.toString());
  }
});
module.exports = router;
