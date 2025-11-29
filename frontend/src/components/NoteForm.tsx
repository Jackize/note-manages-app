import React, { useEffect, useState } from "react";
import type { CreateNoteData, UpdateNoteData } from "../api/notes";

interface NoteFormProps {
  note?: { id: string; title: string; content: string } | null;
  onSubmit: (data: CreateNoteData | UpdateNoteData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  note,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
    setError("");
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      await onSubmit({ title, content });
      if (!note) {
        setTitle("");
        setContent("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save note");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h3>{note ? "Edit Note" : "Create New Note"}</h3>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          placeholder="Enter note title"
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          placeholder="Enter note content"
        />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving..." : note ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};
