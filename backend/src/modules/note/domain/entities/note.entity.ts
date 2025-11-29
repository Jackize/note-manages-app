import { v4 as uuidv4 } from "uuid";
import { NoteTitle } from "../value-objects/note-title.vo";

export class Note {
  private id: string;
  private title: NoteTitle;
  private content: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    title: NoteTitle,
    content: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(title: NoteTitle, content: string): Note {
    const now = new Date();
    const id = uuidv4();
    return new Note(id, title, content, now, now);
  }

  getId(): string {
    return this.id;
  }

  getTitle(): NoteTitle {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateTitle(newTitle: NoteTitle): void {
    this.title = newTitle;
    this.updatedAt = new Date();
  }

  updateContent(newContent: string): void {
    this.content = newContent;
    this.updatedAt = new Date();
  }

  update(newTitle: NoteTitle, newContent: string): void {
    this.title = newTitle;
    this.content = newContent;
    this.updatedAt = new Date();
  }
}
