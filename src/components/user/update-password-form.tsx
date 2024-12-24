import React from 'react'
import { Form, Button, Input } from 'antd'

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}

interface IProps {
  onFinish: Function;
  updating: boolean;
}

export function UpdatePaswordForm({ onFinish, updating = false }: IProps | any) {
  return (
    <Form name="nest-messages" onFinish={(value) => onFinish(value)} {...layout}>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g,
            message: 'Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character'
          },
          { required: true, message: 'Please enter your password!' }
        ]}
      >
        <Input.Password placeholder="Enter password. At least 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit" loading={updating}>
          Update
        </Button>
      </Form.Item>
    </Form>
  )
}
