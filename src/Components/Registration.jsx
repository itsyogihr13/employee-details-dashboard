import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import EmployeeTable from "./EmployDetails";

export const Registration = () => {
  const inputRef = useRef();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: Date.now(),
    FirstName: "",
    LastName: "",
    DOB: "",
    Study: "",
    CurrentSalary: 0,
    Description: "",
    StartDate: "",
    EndDate: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (!formData.FirstName,
      !formData.LastName,
      !formData.DOB,
      !formData.CurrentSalary,
      !formData.StartDate,
      !formData.EndDate,
      !formData.Description)
    ) {
      alert("please fill the detals carefully");
    }
    if (editMode) {
      axios
        .post(
          `https://sweede.app/DeliveryBoy/update-Employee/${formData.id}`,
          formData
        )
        .then((response) => {
          const updatedEmployees = employees.map((employee) => {
            if (employee.id === formData.id) {
              return response.data;
            }
            return employee;
          });
          setEmployees(updatedEmployees);
          setFormData({
            id: Date.now(),
            FirstName: "",
            LastName: "",
            DOB: "",
            Study: "",
            CurrentSalary: 0,
            Description: "",
            StartDate: "",
            EndDate: "",
          });
          setEditMode(false);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      axios
        .post("https://sweede.app/DeliveryBoy/Add-Employee/", formData)
        .then((response) => {
          const addedEmployee = response.data;
          setEmployees([...employees, addedEmployee]);
          setFormData({
            id: Date.now(),
            FirstName: "",
            LastName: "",
            DOB: "",
            Study: "",
            CurrentSalary: 0,
            Description: "",
            StartDate: "",
            EndDate: "",
          });
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    }
  };

  const handleDelete = (employeeId, name) => {
    alert(`${name} detail will be deleted`);
    axios
      .delete(`https://sweede.app/DeliveryBoy/delete-Employee/${employeeId}`)
      .then(() => {
        const updatedEmployees = employees.filter(
          (employee) => employee.id !== employeeId
        );
        setEmployees(updatedEmployees);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleEdit = (employeeId, name) => {
    alert(`Now you can make changes in ${name} Detail`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    inputRef.current.focus();

    const employeeToEdit = employees.find(
      (employee) => employee.id === employeeId
    );
    if (employeeToEdit) {
      setFormData({ ...employeeToEdit });
      setEditMode(true);
    }
  };
  useEffect(() => {
    axios
      .get("https://sweede.app/DeliveryBoy/Get-Employee/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [handleSubmit]);

  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-4xl font-bold mb-16 text-center text-stone-900">
        {editMode ? "Edit Employee" : "Add Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex flex-wrap justify-between -mx-2">
          <div className="w-1/2 px-2">
            <label
              className="block text-gray-700 text-[18px] font-semibold mb-1"
              htmlFor="FirstName"
            >
              First Name
            </label>
            <input
              ref={inputRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstName"
              type="text"
              placeholder="First Name"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 px-2">
            <label
              className="block text-gray-700 text-[18px] font-semibold mb-1"
              htmlFor="LastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastName"
              type="text"
              placeholder="Last Name"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[18px] font-semibold mb-1"
            htmlFor="DOB"
          >
            DOB
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="DOB"
            type="date"
            placeholder="Enter DOB"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
          />{" "}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[18px] font-semibold mb-1"
            htmlFor="Study"
          >
            Study
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Study"
            type="text"
            placeholder="First Name"
            name="Study"
            value={formData.Study}
            onChange={handleChange}
          />
        </div>
        <div className=" px-2">
          <label
            className="block text-gray-700 text-[18px] font-semibold mb-1"
            htmlFor="CurrentSalary"
          >
            Current Salary
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="CurrentSalary"
            type="text"
            placeholder="First Name"
            name="CurrentSalary"
            defaultValue={formData.CurrentSalary}
          />
        </div>
        <div className="px-2">
          <label
            className="block text-gray-700 text-[18px] font-semibold mb-1"
            htmlFor="Description"
          >
            Description
          </label>
          <input
            className="shadow placeholder-h-6 appearance-none border rounded h-[100px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Description"
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            placeholder="Write desc for employee"
          />
        </div>

        <div className="flex flex-wrap justify-between -mx-2">
          <div className="w-1/2 px-2">
            <label
              className="block text-gray-700 text-[18px] font-semibold mb-1"
              htmlFor="StartDate"
            >
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="StartDate"
              type="date"
              placeholder="Write desc for employee"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
            />{" "}
          </div>
          <div className="w-1/2 px-2">
            <label
              className="block text-gray-700 text-[18px] font-semibold mb-1"
              htmlFor="EndDate"
            >
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="EndDate"
              type="date"
              placeholder="Write desc for employee"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
            />{" "}
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <button
            className="bg-stone-900 hover:bg-stone-1000 text-white font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editMode ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold m-4">Employee List</h2>
      <EmployeeTable
        employees={employees}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};
