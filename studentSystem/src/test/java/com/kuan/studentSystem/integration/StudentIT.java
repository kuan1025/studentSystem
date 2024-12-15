package com.kuan.studentSystem.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kuan.studentSystem.student.Gender;
import com.kuan.studentSystem.student.Student;
import com.kuan.studentSystem.student.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class StudentIT {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StudentRepository studentRepository;

    @Test
    void canRegisterNewStudent() throws Exception {
        //given
        Student student = new Student(
                "test", "test1@gmail.com", Gender.FEMALE
        );
        //when
        ResultActions resultAction = mockMvc
                .perform(post("/api/V1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(student)))
                .andDo(print());
        //then
        List<Student> students = studentRepository.findAll();
        resultAction.andExpect(status().isOk());

        assertThat(students).usingElementComparatorIgnoringFields("id")
                .contains(student);
    }

}
