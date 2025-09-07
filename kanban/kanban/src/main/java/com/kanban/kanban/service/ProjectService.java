package com.kanban.kanban.service;

import com.kanban.kanban.model.Project;
import com.kanban.kanban.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.*;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void addProject(Project project){
        projectRepository.save(new Project(project.getName(),project.getCategory(), project.getDescription(), project.getDeadline(), project.getProgress()));
    }

    public void updateProject(Project project) {
        projectRepository.save(project);
    }
}
