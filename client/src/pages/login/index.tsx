import React from "react";
import { Layout } from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = React.useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
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
        <Card title="Log In" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Sign in
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an account?{" "}
              <Link to={Paths.register}>Registration</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
