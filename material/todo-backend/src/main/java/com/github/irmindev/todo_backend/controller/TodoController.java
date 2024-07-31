package com.github.irmindev.todo_backend.controller;

import org.springframework.web.bind.annotation.*;
import com.github.irmindev.todo_backend.model.Todo;
import java.io.*;
import java.nio.file.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/todo")
public class TodoController {

    private static final String FILE_PATH = "todos.txt";
    
    @GetMapping
    public List<Todo> getTodos() {
        try {
            return Files.readAllLines(Paths.get(FILE_PATH)).stream()
                .map(line -> {
                    Todo todo = new Todo();
                    todo.setTodo(line);
                    return todo;
                })
                .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @PostMapping
    public void addTodo(@RequestBody Todo todo) {
        try {
            Files.write(Paths.get(FILE_PATH), (todo.getTodo() + System.lineSeparator()).getBytes(), StandardOpenOption.APPEND, StandardOpenOption.CREATE);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
