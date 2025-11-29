import { Note } from "src/modules/note/domain/entities/note.entity";
import { INoteRepository } from "src/modules/note/infrastructure/repositories/note.repository.interface";

export class InMemoryNoteRepository implements INoteRepository {
  private notes: Note[] = [];

  async save(note: Note): Promise<Note> {
    const existingIndex = this.notes.findIndex(
      (n) => n.getId() === note.getId()
    );
    if (existingIndex >= 0) {
      this.notes[existingIndex] = note;
    } else {
      this.notes.push(note);
    }
    return note;
  }

  async findById(id: string): Promise<Note | null> {
    return this.notes.find((n) => n.getId() === id) ?? null;
  }

  async findByUserId(): Promise<Note[]> {
    // userId is not used in current domain model; return all for compatibility
    return this.notes;
  }

  async findAll(): Promise<Note[]> {
    return this.notes;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((n) => n.getId() !== id);
  }
}
