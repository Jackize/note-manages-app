import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Note } from "../../domain/entities/note.entity";
import { NoteTitle } from "../../domain/value-objects/note-title.vo";
import { INoteRepository } from "../../infrastructure/repositories/note.repository.interface";

@Injectable()
export class NoteService {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async createNote(title: string, content: string): Promise<Note> {
    const note = Note.create(new NoteTitle(title), content);
    return await this.noteRepository.save(note);
  }

  async getNoteById(id: string): Promise<Note> {
    return await this.noteRepository.findById(id);
  }

  async updateNote(id: string, title: string, content: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new NotFoundException("Note not found");
    }
    if (title) {
      note.updateTitle(new NoteTitle(title));
    }
    if (content) {
      note.updateContent(content);
    }
    return await this.noteRepository.save(note);
  }

  async deleteNote(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
