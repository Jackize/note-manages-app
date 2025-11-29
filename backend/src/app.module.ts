import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateNoteUseCase } from "./modules/note/application/use-cases/create-note.use-case";
import { DeleteNoteUseCase } from "./modules/note/application/use-cases/delete-note.use-case";
import { GetNoteUseCase } from "./modules/note/application/use-cases/get-note.use-case";
import { ListNotesAllUseCase } from "./modules/note/application/use-cases/list-notes-all.use-case";
import { UpdateNoteUseCase } from "./modules/note/application/use-cases/update-note.use-case";
import { NotesController } from "./modules/note/interface/controllers/notes.controller";
import { databaseConfig } from "./shared/config/database.config";
import { NoteOrmEntity } from "./shared/database/typeorm/entities/note.orm-entity";
import { NoteRepository } from "./shared/database/typeorm/repositories/note.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([NoteOrmEntity]),
  ],
  controllers: [NotesController],
  providers: [
    NoteRepository,
    CreateNoteUseCase,
    GetNoteUseCase,
    ListNotesAllUseCase,
    UpdateNoteUseCase,
    DeleteNoteUseCase,
    {
      provide: "INoteRepository",
      useClass: NoteRepository,
    },
  ],
})
export class AppModule {}
