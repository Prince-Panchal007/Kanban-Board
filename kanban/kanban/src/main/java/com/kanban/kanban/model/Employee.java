package com.kanban.kanban.model;

import lombok.Data;

@Data
public class Employee {
//    @Id
    int id=(int)(Math.random()*1000);
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
