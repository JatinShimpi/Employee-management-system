import axios from "axios";
import { EmployeeType } from "../Employeeslist";

const apiUrl = import.meta.env.VITE_REST_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Or fetch from context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const listEmployees = () => {
  return apiClient.get("employees");
};

export const createEmployee = (employee: EmployeeType) => {
  return apiClient.post("employees", employee);
};

export const getEmployee = (employeeId: number) => {
  return apiClient.get(`employees/${employeeId}`);
};

export const updateEmployee = (employeeId: number, employee: EmployeeType) => {
  return apiClient.put(`employees/${employeeId}`, employee);
};

export const deleteEmployee = (employeeId: number) => {
  return apiClient.delete(`employees/${employeeId}`);
};