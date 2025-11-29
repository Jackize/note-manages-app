import { Inject, Injectable } from "@nestjs/common";
import { Note } from "../../domain/entities/note.entity";
import { INoteRepository } from "../../infrastructure/repositories/note.repository.interface";

@Injectable()
export class ListNotesAllUseCase {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async execute(): Promise<Note[]> {
    return await this.noteRepository.findAll();
  }
}
