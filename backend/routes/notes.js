import express from "express";
const router = express.Router();
import notesModel from "../models/notesModel.js";

// Add note
router.post("/addNote", async (req, res) => {
  const { title } = req.body;
  try {
    const note = new notesModel({ title });
    const newNote = await note.save();

    res.status(201).send(newNote);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Get noteby id
router.get("/getnote/:id", async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.id);
    res.send(note);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Get all notes
router.get("/getAllNotes", async (req, res) => {
  try {
    const notes = await notesModel.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Update note
router.put("/updateNote/:id", async (req, res) => {
  const { title } = req.body;
  try {
    const note = await notesModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title },
      },
      {
        new: true,
      }
    );

    res.status(200).send(note)
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Delete note
router.delete("/deleteNote/:id", async (req, res) => {
  try {
    const note = await notesModel.findByIdAndDelete(req.params.id);
    res.status(200).send(note);

  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export default router;
