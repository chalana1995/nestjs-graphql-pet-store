import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: //'username',
      password: //'server password',
      database: //'database name',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    PetsModule,
    OwnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
