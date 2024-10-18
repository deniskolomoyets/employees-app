import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { Layout } from "../../components/layout";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useState } from "react";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const {
    data,
    isLoading,
    error: fetchError,
  } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (fetchError) {
    console.error("Error fetching employee data:", fetchError);
    return <span>Error fetching employee data</span>;
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      console.log("Edited Employee:", editedEmployee);

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  console.log("Employee ID:", params.id);
  console.log("Employee Data:", data);

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleEditUser}
          title="Edit an employee"
          btnText="Edit"
          error={error}
          employee={data}
        />
      </Row>
    </Layout>
  );
};
