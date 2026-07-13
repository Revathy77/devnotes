import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const { search, category, favorite } = req.query;
    const query = { user: req.userId };

    if (search) query.title = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;
    if (favorite === "true") query.favorite = true;

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Note route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const note = await Note.create({ user: req.userId, title, content, category });
    res.status(201).json(note);
  } catch (err) {
    console.error("Note route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    const { title, content, category } = req.body;
    if (title) note.title = title;
    if (content) note.content = content;
    if (category) note.category = category;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error("Note route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Note route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.favorite = !note.favorite;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error("Note route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
