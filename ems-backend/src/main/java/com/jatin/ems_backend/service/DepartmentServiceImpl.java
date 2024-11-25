package com.jatin.ems_backend.service;

import com.jatin.ems_backend.dto.DepartmentDto;
import com.jatin.ems_backend.entity.Department;
import com.jatin.ems_backend.exception.ResourceNotFoundException;
import com.jatin.ems_backend.mapper.DepartmentMapper;
import com.jatin.ems_backend.repository.DepartmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService{

    private DepartmentRepository departmentRepository;
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()-> new ResourceNotFoundException("Department with id "+departmentId+" does not exixt")
        );

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
       List<Department> departments = departmentRepository.findAll();


        return departments.stream().map((department)->DepartmentMapper.mapToDepartmentDto(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()->new ResourceNotFoundException("Department with id "+departmentId+" does not exixt")
        );
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()-> new ResourceNotFoundException("Department with id "+departmentId+" does not exixt")
        );

        departmentRepository.delete(department);
    }
}
