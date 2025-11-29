import { Inject, Injectable } from "@nestjs/common";
import { Note } from "../../domain/entities/note.entity";
import { NoteTitle } from "../../domain/value-objects/note-title.vo";
import { INoteRepository } from "../../infrastructure/repositories/note.repository.interface";

@Injectable()
export class CreateNoteUseCase {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async execute(title: string, content: string): Promise<Note> {
    const noteTitle = new NoteTitle(title);
    const note = Note.create(noteTitle, content);
    return await this.noteRepository.save(note);
  }
}
