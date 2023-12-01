"use client";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import React from "react";

function LoginForm(): JSX.Element {
  const [form] = Form.useForm();
  const onFinish = (value: object) => {
    console.log(value);
  };
  return <Form>Login</Form>;
}

export default LoginForm;
