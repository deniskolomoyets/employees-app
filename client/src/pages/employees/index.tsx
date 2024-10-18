import React, { useEffect } from "react";
import { Layout } from "../../components/layout";
import { CustomButton } from "../../components/custom-button";
import { PlusCircleFilled } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import type { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";

const columns: ColumnsType<Employee> = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const goToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleFilled />}
      >
        Add
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
