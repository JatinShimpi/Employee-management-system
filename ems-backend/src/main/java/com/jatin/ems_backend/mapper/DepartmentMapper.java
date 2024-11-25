package com.jatin.ems_backend.mapper;

import com.jatin.ems_backend.dto.DepartmentDto;
import com.jatin.ems_backend.entity.Department;

public class DepartmentMapper {
    //converts departmentJpa entity into departmentDto
    public static DepartmentDto mapToDepartmentDto(Department department){
       return new DepartmentDto(
               department.getId(),
               department.getDepartmentName(),
               department.getDepartmentDescription()
       );
    }

    public static Department mapToDepartment(DepartmentDto departmentdto){
        return new Department(
                departmentdto.getId(),
                departmentdto.getDepartmentName(),
                departmentdto.getDepartmentDescription()
        );
    }
}
