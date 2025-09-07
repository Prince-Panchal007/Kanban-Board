package com.kanban.kanban.service;

import com.kanban.kanban.model.Employee;
import com.kanban.kanban.repository.EmployeeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getEmployees(){
        return employeeRepository.findAll();
    }

    public void addEmployee(Employee employee) {
        employeeRepository.save(new Employee(employee.getName(),employee.getEmail(),employee.getAvatar(),employee.getRole()));
    }

    public void updateEmployee(Employee employee) {
        employeeRepository.save(employee);
    }
}
