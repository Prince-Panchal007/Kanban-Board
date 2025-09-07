package com.kanban.kanban.repository;

import com.kanban.kanban.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
