import { Note } from "../../domain/entities/note.entity";

export interface INoteRepository {
  save(note: Note): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  delete(id: string): Promise<void>;
}
