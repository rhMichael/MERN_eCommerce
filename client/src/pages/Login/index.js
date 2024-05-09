import { Button, Divider, Form, Input, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: 'required',
  },

]
function Login() {
  const onFinish = async(values) => {
    // console.log("Success:", values);
    try {
      const response = await LoginUser(values);
      if(response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = '/';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400">LOGIN</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-3">
            Login
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
