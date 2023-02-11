import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './lesson/lesson.module';
import * as config from 'config';
import { Lesson } from './lesson/lesson.entity';


const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'mongodb',
      url : `mongodb+srv://admin:${dbConfig.password}@cluster0.j7bx5hf.mongodb.net/graphql?retryWrites=true&w=majority`,
      synchronize : true,
      useUnifiedTopology : true,
      entities : [Lesson]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    LessonModule
  ],
})
export class AppModule {}
