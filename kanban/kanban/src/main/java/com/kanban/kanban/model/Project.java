package com.kanban.kanban.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
