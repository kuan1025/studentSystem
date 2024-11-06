package com.kuan.studentSystem.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/V1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudent(){
        return Arrays.asList(
                new Student(1L, "Kuan", "Kuan8877@gmail.com", Gender.Male),
                new Student(2L, "Ellie", "Ellie@gmail.com", Gender.Female)
        );
    }


}
