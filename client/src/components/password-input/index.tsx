import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

import React from "react";

type Props = {
  name: NamePath;
  placeholder: string;
  dependencies?: NamePath[]; // for password and repeat password (for error message that passwords do not match)
};
export const PasswordInput = ({ name, placeholder, dependencies }: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Required field",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords should match"));
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Password should be at least 6 characters")
                );
              }

              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
