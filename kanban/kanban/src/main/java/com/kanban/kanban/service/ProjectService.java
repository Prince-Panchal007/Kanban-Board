package com.kanban.kanban.service;

import com.kanban.kanban.model.Project;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.*;

@Service
public class ProjectService {
    List<Project> l=new ArrayList<>(Arrays.asList(
            new Project(
                    "Website Redesign",
                    "Design",
                    "Complete overhaul of company website",
                    "2024-12-31",
                    65
            ),
            new Project(
                    "Mobile App Development",
                    "Development",
                    "iOS and Android app for customers",
                    "2024-11-15",
                    40
            ),
            new Project(
                    "Marketing Campaign",
                    "Marketing",
                    "Launch new social media and ad campaigns",
                    "2024-10-20",
                    55
            ),
            new Project(
                    "Data Migration",
                    "IT",
                    "Migrate company database to cloud infrastructure",
                    "2024-09-30",
                    80
            ),
            new Project(
                    "Customer Portal",
                    "Development",
                    "Build a self-service portal for clients",
                    "2025-01-10",
                    20
            ),
            new Project(
                    "Brand Guidelines",
                    "Design",
                    "Create updated branding and style guide",
                    "2024-08-25",
                    95
            )
    ));

    public List<Project> getAllProjects() {
        return l;
    }

    public void addProject(Project project){
        l.add(project);
    }

    public void updateProject(Project project) {
        l.replaceAll(p->p.getId() == project.getId()?project:p);
    }
}
