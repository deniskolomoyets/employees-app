import React from "react";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import styles from "./index.module.css";
import { CustomButton } from "../custom-button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="link">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type="default" icon={<UserOutlined />}>
            Register
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="default" icon={<LoginOutlined />}>
            Login
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
