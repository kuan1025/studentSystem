package com.kuan.studentSystem.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        studentRepository.save(student);
    }

    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

    public boolean checkIfEmailExisted(String email) {
        System.out.println("debug :"+ studentRepository.existsByEmail(email));
        return studentRepository.existsByEmail(email);
    }

    public boolean chechIfStudentIdExisted(Long id){
        return studentRepository.existsById(id);
    }
}
