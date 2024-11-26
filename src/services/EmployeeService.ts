import axios from "axios";
import { EmployeeType } from "../Employeeslist";

const REST_API_BASE_URL =
  "https://disturbed-marilin-jatin123-58a12b05.koyeb.app/api/employees";

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL);
};

export const createEmployee = (employee: EmployeeType) => {
  return axios.post(REST_API_BASE_URL, employee);
};

export const getEmployee = (employeeId: number) => {
  return axios.get(REST_API_BASE_URL + "/" + employeeId);
};

export const updateEmployee = (employeeId: number, employee: EmployeeType) => {
  return axios.put(REST_API_BASE_URL + "/" + employeeId, employee);
};

export const deleteEmployee = (employeeId: number) => {
  return axios.delete(REST_API_BASE_URL + "/" + employeeId);
};
