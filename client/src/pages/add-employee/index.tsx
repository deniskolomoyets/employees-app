import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useNavigate } from "react-router-dom";

export const AddEmployee = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap(); // unwrap() is a utility function that extracts the payload of a fulfilled action
      navigate(`${Paths.status}/created`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Add employee"
          btnText="Add"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
