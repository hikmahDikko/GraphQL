import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor (
        @InjectRepository(Student)
        private studentRepository : Repository <Student>
    ) {}

    async getStudent(id : string) : Promise<Student> {
        return this.studentRepository.findOneBy({ id })
    }

    async createStudent(createStudentInput : CreateStudentInput) : Promise<Student>{
        const { firstName, lastName } = createStudentInput;

        const Student = await this.studentRepository.create({
            id : uuid(),
            firstName,
            lastName
        });

        return this.studentRepository.save(Student);
    }

    async getStudents() : Promise<Student[]> {
        return this.studentRepository.find();
    }
}