/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, FindOptionsSelect, Repository, UpdateResult } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENT_REPOSITORY') private repository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.nome = createStudentDto.nome;
    return await this.repository.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.repository.find();
  }

  findOne(options: {
    select: FindOptionsSelect<Student>;
    where: Partial<Student>;
  }): Promise<Student> {
    return this.repository.findOne({
      select: options.select,
      where: options.where,
    });
  }

  async update(codigo: number, updateStudentDto: UpdateStudentDto): Promise<UpdateResult> {
    return await this.repository.update(codigo, updateStudentDto);
  }

  remove(codigo: number): Promise<DeleteResult> {
    return this.repository.delete(codigo);
  }
}
