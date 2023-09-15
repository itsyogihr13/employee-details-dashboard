import React, { useState } from "react";

function EmployeeTable({ employees, handleEdit, handleDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.LastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full border border-[#D5D5D5]">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              DOB
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Study
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Current Salary
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.FirstName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.LastName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.DOB}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.Study}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.CurrentSalary}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.Description}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.StartDate}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.EndDate}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button
                  onClick={() => {
                    handleEdit(employee.id, employee.FirstName);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id, employee.FirstName)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
