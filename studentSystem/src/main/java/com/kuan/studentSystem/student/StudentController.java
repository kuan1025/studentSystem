package com.kuan.studentSystem.student;

import com.kuan.studentSystem.student.exception.BadRequestException;
import com.kuan.studentSystem.student.exception.StudentNotFoundException;
import javassist.tools.web.BadHttpRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/V1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudent()  {
//        throw new IllegalStateException("oops!");
        return studentService.getAllStudents();
    }


    @PostMapping
    public void addStudent(@Valid @RequestBody Student student) {
        if(studentService.checkIfEmailExisted(student.getEmail())){
            throw new BadRequestException("duplicate email : " + student.getEmail());
        }
        studentService.addStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable long id) {
        if(!studentService.chechIfStudentIdExisted(id)){
            throw new StudentNotFoundException("student is not existed" + " [ id :"+ id +"] ");
        }
        studentService.deleteStudent(id);
    }

}
