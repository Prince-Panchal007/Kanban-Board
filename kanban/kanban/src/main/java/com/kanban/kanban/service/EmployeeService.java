package com.kanban.kanban.service;

import com.kanban.kanban.model.Employee;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeService {
    List<Employee> l=new ArrayList<>(Arrays.asList(
            new Employee("Sarah Johnson", "sarah@company.com", "SJ", "Designer"),
            new Employee("Mike Chen", "mike@company.com", "MC", "Developer"),
            new Employee("Emma Davis", "emma@company.com", "ED", "Product Manager"),
            new Employee("John Smith", "john@company.com", "JS", "Developer")
    ));

    public List<Employee> getEmployees(){
        return l;
    }

    public void addEmployee(Employee employee) {
        l.add(employee);
    }

    public void updateEmployee(Employee employee) {
        l.replaceAll(e->e.getId() == employee.getId()?employee:e);
    }
}
