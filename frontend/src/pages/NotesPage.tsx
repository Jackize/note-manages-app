import React, { useEffect, useState } from "react";
import type { CreateNoteData, Note, UpdateNoteData } from "../api/notes";
import { notesApi } from "../api/notes";
import { NoteCard } from "../components/NoteCard";
import { NoteForm } from "../components/NoteForm";

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedNotes = await notesApi.getAll();
      setNotes(fetchedNotes);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: CreateNoteData | UpdateNoteData) => {
    try {
      setFormLoading(true);
      if (editingNote) {
        await notesApi.update(editingNote.id, data as UpdateNoteData);
      } else {
        await notesApi.create(data as CreateNoteData);
      }
      setEditingNote(null);
      await fetchNotes();
    } catch (err: any) {
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await notesApi.delete(id);
      await fetchNotes();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <div className="notes-page">
      <header className="page-header">
        <h1>My Notes</h1>
      </header>

      <NoteForm
        note={editingNote}
        onSubmit={handleSubmit}
        onCancel={() => setEditingNote(null)}
        loading={formLoading}
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditingNote}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
