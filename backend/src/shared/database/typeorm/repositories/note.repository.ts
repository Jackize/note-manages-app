import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "src/modules/note/domain/entities/note.entity";
import { NoteTitle } from "src/modules/note/domain/value-objects/note-title.vo";
import { INoteRepository } from "src/modules/note/infrastructure/repositories/note.repository.interface";
import { Repository } from "typeorm";
import { NoteOrmEntity } from "../entities/note.orm-entity";

@Injectable()
export class NoteRepository implements INoteRepository {
  constructor(
    @InjectRepository(NoteOrmEntity)
    private readonly ormRepository: Repository<NoteOrmEntity>
  ) {}

  async save(note: Note): Promise<Note> {
    const ormEntity = this.toOrmEntity(note);
    const saved = await this.ormRepository.save(ormEntity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<Note | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async findAll(): Promise<Note[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map((entity) => this.toDomainEntity(entity));
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  private toDomainEntity(ormEntity: NoteOrmEntity): Note {
    return new Note(
      ormEntity.id,
      new NoteTitle(ormEntity.title),
      ormEntity.content,
      ormEntity.createdAt,
      ormEntity.updatedAt
    );
  }

  private toOrmEntity(domainEntity: Note): NoteOrmEntity {
    const ormEntity = new NoteOrmEntity();
    ormEntity.id = domainEntity.getId();
    ormEntity.title = domainEntity.getTitle().getValue();
    ormEntity.content = domainEntity.getContent();
    ormEntity.createdAt = domainEntity.getCreatedAt();
    ormEntity.updatedAt = domainEntity.getUpdatedAt();
    return ormEntity;
  }
}
