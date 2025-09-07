package com.kanban.kanban.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
public class Project {
    int id=(int)(Math.random()*1000);
    private String name;
    private String category;
    private String description;
    private String deadline;
    private List<Integer> todo;
    private List<Integer> inProgress;
    private List<Integer> review;
    private List<Integer> done;

    private int progress;

    public Project(String name, String category, String description, String deadline, int progress) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.deadline = deadline;
        this.progress = progress;
    }
}
