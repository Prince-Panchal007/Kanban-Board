package com.kanban.kanban.service;

import com.kanban.kanban.model.Employee;
import com.kanban.kanban.model.Task;
import com.kanban.kanban.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public void addTask(Task task) {
        taskRepository.save(task);
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public void updateTask(Task task) {
        taskRepository.save(task);
    }
}
