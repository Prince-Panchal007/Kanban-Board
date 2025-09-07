package com.kanban.kanban.controller;

import java.util.*;
import com.kanban.kanban.model.Project;
import com.kanban.kanban.service.ProjectService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/getProject")
    public List<Project> getProjects(){
        return projectService.getAllProjects();
    }

    @PostMapping("/add")
    public void addProject(@RequestBody Project project){
        projectService.addProject(project);
    }

    @PostMapping("/update")
    public void updateProject(@RequestBody Project project){
        projectService.updateProject(project);
        System.out.println("==========================================================");
        System.out.println(project);
        System.out.println("==========================================================");
    }

}
