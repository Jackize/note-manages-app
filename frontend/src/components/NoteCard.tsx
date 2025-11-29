import React from "react";
import type { Note } from "../api/notes";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(note.id)} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-date">Updated: {formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
};
