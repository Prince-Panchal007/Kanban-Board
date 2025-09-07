package com.kanban.kanban.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String email;
    String avatar;
    String role;
    boolean online=true;

    public Employee(String name, String email, String avatar, String role) {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
    }

}
