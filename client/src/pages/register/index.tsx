import { Layout } from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");

      navigate("/");
    } catch (error) {
      const mayBeError = isErrorWithMessage(error);

      if (mayBeError) {
        setError(error.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Register" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />

            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Repeat the password"
            />
            <CustomButton type="primary" htmlType="submit">
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already have an account? <Link to={Paths.login}>Log in</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
