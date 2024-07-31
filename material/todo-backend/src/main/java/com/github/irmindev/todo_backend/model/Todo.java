package com.github.irmindev.todo_backend.model;

public class Todo {
    private String todo;

    public Todo() {
    }

    public Todo(String todo) {
        this.todo = todo;
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }
}
