import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { INoteRepository } from "../../infrastructure/repositories/note.repository.interface";

@Injectable()
export class DeleteNoteUseCase {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async execute(noteId: string): Promise<void> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    await this.noteRepository.delete(noteId);
  }
}
