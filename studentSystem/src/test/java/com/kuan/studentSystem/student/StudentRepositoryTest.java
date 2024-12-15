package com.kuan.studentSystem.student;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @Test
    void itShouldCheckIfStudentExistsEmail() {
        //given
        Student student = new Student("Dabi", "dabi@gmail.com", Gender.MALE);
        underTest.save(student);
        //when
        boolean exists = underTest.selectExistsEmail("dabi@gmail.com");
        //then
        assertThat(exists).isTrue();

    }


}