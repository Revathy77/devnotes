export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm note-card">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{note.title}</h5>
            <span
              className="favorite-star"
              onClick={() => onToggleFavorite(note._id)}
              title="Toggle favorite"
            >
              {note.favorite ? "⭐" : "☆"}
            </span>
          </div>
          <span className="badge bg-info text-dark align-self-start mb-2">{note.category}</span>
          <p className="card-text flex-grow-1">{note.content}</p>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(note)}>Edit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(note._id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
