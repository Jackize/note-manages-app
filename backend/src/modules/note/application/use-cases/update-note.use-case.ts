import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Note } from "../../domain/entities/note.entity";
import { NoteTitle } from "../../domain/value-objects/note-title.vo";
import { INoteRepository } from "../../infrastructure/repositories/note.repository.interface";

@Injectable()
export class UpdateNoteUseCase {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async execute(
    noteId: string,
    title?: string,
    content?: string
  ): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (title !== undefined) {
      const noteTitle = new NoteTitle(title);
      note.updateTitle(noteTitle);
    }

    if (content !== undefined) {
      note.updateContent(content);
    }

    return await this.noteRepository.save(note);
  }
}
