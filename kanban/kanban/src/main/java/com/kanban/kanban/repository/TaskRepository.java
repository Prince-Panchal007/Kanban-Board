package com.kanban.kanban.repository;

import com.kanban.kanban.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {
}
