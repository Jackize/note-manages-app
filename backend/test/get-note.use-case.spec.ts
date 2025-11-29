import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { GetNoteUseCase } from "../src/modules/note/application/use-cases/get-note.use-case";
import { Note } from "../src/modules/note/domain/entities/note.entity";
import { NoteTitle } from "../src/modules/note/domain/value-objects/note-title.vo";
import { InMemoryNoteRepository } from "./helper/note-repository";

// Mock uuid to avoid Jest ESM import issues with uuid package
jest.mock("uuid", () => ({
  v4: () => "test-id",
}));

describe("GetNoteUseCase", () => {
  let useCase: GetNoteUseCase;
  let repo: InMemoryNoteRepository;

  beforeEach(async () => {
    repo = new InMemoryNoteRepository();

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetNoteUseCase,
        {
          provide: "INoteRepository",
          useValue: repo,
        },
      ],
    }).compile();

    useCase = moduleRef.get(GetNoteUseCase);
  });

  it("should return a note when it exists", async () => {
    const note = await repo.save(
      Note.create(new NoteTitle("title"), "content")
    );

    const found = await useCase.execute(note.getId());
    expect(found.getId()).toBe(note.getId());
    expect(found.getTitle().getValue()).toBe("title");
  });

  it("should throw NotFoundException when note does not exist", async () => {
    await expect(useCase.execute("non-existent-id")).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
