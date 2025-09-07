package com.kanban.kanban.service;

import com.kanban.kanban.model.Employee;
import com.kanban.kanban.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {
    List<Task> l=new ArrayList<>();

    public void addTask(Task task) {
        l.add(task);
        System.out.println("==================================================================================");
        for (Task t:l) {
            System.out.println(t);
        }
        System.out.println("==================================================================================");
    }

    public List<Task> getTasks() {
        return l;
    }

    public void updateTask(Task task) {
        l.replaceAll(e->e.getId() == task.getId()?task:e);
    }
}
