import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from "@nestjs/common";
import { CreateNoteDto } from "src/modules/note/application/dto/create-note.dto";
import { UpdateNoteDto } from "src/modules/note/application/dto/update-note.dto";
import { CreateNoteUseCase } from "src/modules/note/application/use-cases/create-note.use-case";
import { DeleteNoteUseCase } from "src/modules/note/application/use-cases/delete-note.use-case";
import { GetNoteUseCase } from "src/modules/note/application/use-cases/get-note.use-case";
import { ListNotesAllUseCase } from "src/modules/note/application/use-cases/list-notes-all.use-case";
import { UpdateNoteUseCase } from "src/modules/note/application/use-cases/update-note.use-case";
import { Note } from "src/modules/note/domain/entities/note.entity";
import { NoteResponseDto } from "src/modules/note/interface/responses/note-response.dto";

@Controller("notes")
export class NotesController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly getNoteUseCase: GetNoteUseCase,
    private readonly listNotesAllUseCase: ListNotesAllUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createNoteDto: CreateNoteDto
  ): Promise<NoteResponseDto> {
    const note = await this.createNoteUseCase.execute(
      createNoteDto.title,
      createNoteDto.content
    );
    return this.toDto(note);
  }

  @Get()
  async findAll(): Promise<NoteResponseDto[]> {
    const notes = await this.listNotesAllUseCase.execute();
    return notes.map((note) => this.toDto(note));
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<NoteResponseDto> {
    const note = await this.getNoteUseCase.execute(id);
    return this.toDto(note);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto
  ): Promise<NoteResponseDto> {
    const note = await this.updateNoteUseCase.execute(
      id,
      updateNoteDto.title,
      updateNoteDto.content
    );
    return this.toDto(note);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string): Promise<void> {
    await this.deleteNoteUseCase.execute(id);
  }

  private toDto(note: Note): NoteResponseDto {
    return {
      id: note.getId(),
      title: note.getTitle().getValue(),
      content: note.getContent(),
      createdAt: note.getCreatedAt(),
      updatedAt: note.getUpdatedAt(),
    };
  }
}
