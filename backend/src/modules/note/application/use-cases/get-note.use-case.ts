import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Note } from "../../domain/entities/note.entity";
import { INoteRepository } from "../../infrastructure/repositories/note.repository.interface";

@Injectable()
export class GetNoteUseCase {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async execute(noteId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    return note;
  }
}
