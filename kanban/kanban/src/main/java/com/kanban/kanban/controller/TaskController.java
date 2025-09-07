package com.kanban.kanban.controller;

import com.kanban.kanban.model.Task;
import com.kanban.kanban.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/add")
    public void addTask(@RequestBody Task task){
        System.out.println("Task : "+task);
        taskService.addTask(task);
    }

    @PostMapping("/getTask")
    public List<Task> getTasks(){
        return taskService.getTasks();
    }

    @PostMapping("/update")
    public void updateProject(@RequestBody Task task){
        taskService.updateTask(task);
        System.out.println("==========================================================");
        System.out.println(task);
        System.out.println("==========================================================");
    }

}
