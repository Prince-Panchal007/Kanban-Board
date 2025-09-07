package com.kanban.kanban.model;
import lombok.Data;

import java.time.LocalDate;
import java.util.*;

@Data
public class Task {
    private int id;
    private int projectId;
    private String type;
    private String title;
    private String description;
    private int assignee;
    private String dueDate;
    private String priority;
    private List<String> labels;
    private List<String> comments=new ArrayList<>();

    public Task(int id, int projectId, String title, String description, int assignee, String dueDate, String priority, List<String> labels, String type) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.dueDate = dueDate;
        this.priority = priority;
        this.labels = labels;
        this.type=type;
    }
}
