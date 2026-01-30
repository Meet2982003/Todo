package com.mt.todo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mt.todo.model.Todo;

public interface TodoRepo extends JpaRepository<Todo, Long> {

}
