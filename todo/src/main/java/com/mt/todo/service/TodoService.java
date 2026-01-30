package com.mt.todo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mt.todo.Exception.ResourceNotFoundException;
import com.mt.todo.model.Todo;
import com.mt.todo.repo.TodoRepo;
import com.mt.todo.utils.BeanUtils;

@Service
public class TodoService {

    @Autowired
    private TodoRepo todoRepo;

    public Todo saveTodo(Todo todo) {
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todoRepo.save(todo);
    }

    public List<Todo> getAllTodos() {
        return todoRepo.findAll();
    }

    public Todo getTodoById(Long id) {
        return todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
    }

    public Todo updateTodo(Long id, Todo todoDetails) {
        return todoRepo.findById(id)
                .map(todo -> {
                    BeanUtils.copyNullProperties(todoDetails, todo);
                    todo.setUpdatedAt(LocalDateTime.now());
                    return todoRepo.save(todo);
                })
                .orElse(null);
    }

    public void deleteTodo(Long id) {
        todoRepo.deleteById(id);
    }

    public long getActiveCount() {
        return todoRepo.findAll().stream().filter(t -> !t.getCompleted()).count();
    }

}
