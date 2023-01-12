// nest config
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';

// providers
import { APP_PIPE } from '@nestjs/core';

// main modules
import { PostsModule } from './modules/posts/posts.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
    }),
    PrismaModule,
    // main modules
    EventsModule,
    PostsModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}