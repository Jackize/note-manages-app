import { Test } from "@nestjs/testing";
import { CreateNoteDto } from "../src/modules/note/application/dto/create-note.dto";
import { UpdateNoteDto } from "../src/modules/note/application/dto/update-note.dto";
import { CreateNoteUseCase } from "../src/modules/note/application/use-cases/create-note.use-case";
import { DeleteNoteUseCase } from "../src/modules/note/application/use-cases/delete-note.use-case";
import { GetNoteUseCase } from "../src/modules/note/application/use-cases/get-note.use-case";
import { ListNotesAllUseCase } from "../src/modules/note/application/use-cases/list-notes-all.use-case";
import { UpdateNoteUseCase } from "../src/modules/note/application/use-cases/update-note.use-case";
import { Note } from "../src/modules/note/domain/entities/note.entity";
import { NoteTitle } from "../src/modules/note/domain/value-objects/note-title.vo";
import { NotesController } from "../src/modules/note/interface/controllers/notes.controller";

jest.mock("uuid", () => ({
  v4: () => "test-id",
}));

describe("NotesController", () => {
  let controller: NotesController;

  // simple mocks for use-cases
  const note = Note.create(new NoteTitle("title"), "content");
  const createNoteUseCase = {
    execute: jest.fn().mockResolvedValue(note),
  };
  const getNoteUseCase = {
    execute: jest.fn().mockResolvedValue(note),
  };
  const listNotesAllUseCase = {
    execute: jest.fn().mockResolvedValue([note]),
  };
  const updateNoteUseCase = {
    execute: jest.fn().mockResolvedValue(note),
  };
  const deleteNoteUseCase = {
    execute: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        { provide: CreateNoteUseCase, useValue: createNoteUseCase },
        { provide: GetNoteUseCase, useValue: getNoteUseCase },
        { provide: ListNotesAllUseCase, useValue: listNotesAllUseCase },
        { provide: UpdateNoteUseCase, useValue: updateNoteUseCase },
        { provide: DeleteNoteUseCase, useValue: deleteNoteUseCase },
      ],
    }).compile();

    controller = moduleRef.get(NotesController);
  });

  it("should create a note and map to response DTO", async () => {
    const dto: CreateNoteDto = { title: "title", content: "content" };
    const res = await controller.create(dto);

    expect(createNoteUseCase.execute).toHaveBeenCalledWith("title", "content");
    expect(res).toEqual({
      id: note.getId(),
      title: "title",
      content: "content",
      createdAt: note.getCreatedAt(),
      updatedAt: note.getUpdatedAt(),
    });
  });

  it("should return all notes", async () => {
    const res = await controller.findAll();
    expect(listNotesAllUseCase.execute).toHaveBeenCalled();
    expect(res.length).toBe(1);
  });

  it("should update a note", async () => {
    const dto: UpdateNoteDto = { title: "updated", content: "updated" };
    const res = await controller.update("note-id", dto);

    expect(updateNoteUseCase.execute).toHaveBeenCalledWith(
      "note-id",
      "updated",
      "updated"
    );
    expect(res.title).toBe("title"); // domain still returns original title in this mock
  });

  it("should delete a note", async () => {
    await controller.remove("note-id");
    expect(deleteNoteUseCase.execute).toHaveBeenCalledWith("note-id");
  });
});
