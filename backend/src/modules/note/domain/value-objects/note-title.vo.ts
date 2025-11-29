export class NoteTitle {
  private readonly value: string;

  constructor(title: string) {
    if (!title || title.trim().length === 0) {
      throw new Error("Note title cannot be empty");
    }
    if (title.length > 200) {
      throw new Error("Note title cannot exceed 200 characters");
    }
    this.value = title.trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: NoteTitle): boolean {
    return this.value === other.value;
  }
}
