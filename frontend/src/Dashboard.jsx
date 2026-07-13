import { useState, useEffect } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NoteModal from "../components/NoteModal.jsx";

const CATEGORIES = ["All", "General", "Work", "Personal", "Learning", "Ideas"];

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    const { data } = await api.get("/notes", { params: { search, category } });
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const handleSave = async (form) => {
    if (editingNote) {
      await api.put(`/notes/${editingNote._id}`, form);
    } else {
      await api.post("/notes", form);
    }
    setShowModal(false);
    setEditingNote(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    }
  };

  const handleToggleFavorite = async (id) => {
    await api.patch(`/notes/${id}/favorite`);
    fetchNotes();
  };

  const openCreateModal = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="container pb-5">
        <div className="row mb-4 g-2 align-items-center">
          <div className="col-12 col-md-5">
            <input
              className="form-control"
              placeholder="Search notes by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-8 col-md-4">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-4 col-md-3 text-end">
            <button className="btn btn-primary w-100" onClick={openCreateModal}>+ New Note</button>
          </div>
        </div>

        {notes.length === 0 ? (
          <p className="text-center text-secondary mt-5">No notes found. Create your first note!</p>
        ) : (
          <div className="row">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      <NoteModal
        show={showModal}
        note={editingNote}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}
