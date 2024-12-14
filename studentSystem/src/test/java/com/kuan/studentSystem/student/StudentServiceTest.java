package com.kuan.studentSystem.student;

import com.kuan.studentSystem.student.exception.BadRequestException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;
    private AutoCloseable autoCloseable;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new StudentService(studentRepository);
    }

    @AfterEach
    void testDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void getAllStudents() {
        // when
        underTest.getAllStudents();
        verify(studentRepository).findAll();

    }

    @Test
    void addStudent() {

        //given
        Student student = new Student("Dabi", "dabi@gmail.com", Gender.MALE);
        //when
        underTest.addStudent(student);
        //then
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(studentArgumentCaptor.capture());

        Student value = studentArgumentCaptor.getValue();
        assertThat(value).isEqualTo(student);


    }


    @Test
    void willThrowWhenEmailIsTaken() {

        //given
        Student student = new Student("Dabi", "dabi@gmail.com", Gender.MALE);
        
        given(studentRepository.selectExistsEmail(student.getEmail())).willReturn(true);

        //then
        assertThatThrownBy(() -> underTest.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email " + student.getEmail() + " taken");

        verify(studentRepository, never()).save(any());

    }

    @Test
    void deleteStudent() {
    }
}