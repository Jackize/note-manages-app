import { Test } from "@nestjs/testing";
import { CreateNoteUseCase } from "../src/modules/note/application/use-cases/create-note.use-case";
import { Note } from "../src/modules/note/domain/entities/note.entity";
import { InMemoryNoteRepository } from "./helper/note-repository";

jest.mock("uuid", () => ({
  v4: () => "test-id",
}));

describe("CreateNoteUseCase", () => {
  let useCase: CreateNoteUseCase;
  let repo: InMemoryNoteRepository;

  beforeEach(async () => {
    repo = new InMemoryNoteRepository();

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateNoteUseCase,
        {
          provide: "INoteRepository",
          useValue: repo,
        },
      ],
    }).compile();

    useCase = moduleRef.get(CreateNoteUseCase);
  });

  it("should create a note with valid title and content", async () => {
    const note = await useCase.execute("My title", "My content");

    expect(note).toBeInstanceOf(Note);
    expect(note.getTitle().getValue()).toBe("My title");
    expect(note.getContent()).toBe("My content");

    const stored = await repo.findById(note.getId());
    expect(stored).not.toBeNull();
  });

  it("should enforce title rules through NoteTitle value object", async () => {
    await expect(useCase.execute("", "content")).rejects.toThrow();
    await expect(useCase.execute("   ", "content")).rejects.toThrow();

    const longTitle = "a".repeat(201);
    await expect(useCase.execute(longTitle, "content")).rejects.toThrow();
  });
});
