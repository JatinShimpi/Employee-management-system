import { DepartmentType } from "../DepartmentsList";
import { apiClient } from "./apiClient";



export const listDepartments = () => {
  return apiClient.get("departments");
};

export const createDepartment = (department: DepartmentType) => {
  return apiClient.post("departments", department);
};

export const getDepartment = (departmentId: number) => {
  return apiClient.get(`departments/${departmentId}`);
};

export const updateDepartment = (
  departmentId: number,
  department: DepartmentType
) => {
  return apiClient.put(`departments/${departmentId}`, department);
};

export const deleteDepartment = (departmentId: number) => {
  return apiClient.delete(`departments/${departmentId}`);
};