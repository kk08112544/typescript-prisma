import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [BookModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
