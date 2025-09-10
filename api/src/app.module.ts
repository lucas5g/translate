import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhraseModule } from './phrase/phrase.module';

@Module({
  imports: [PhraseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
