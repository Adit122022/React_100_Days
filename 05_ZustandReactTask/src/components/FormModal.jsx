import React from "react";
import { Modal, Form, Input, Button } from "antd";

const FormModal = ({ open,setOpen ,onSubmit }) => {
  const [form] = Form.useForm();


   const onClose=()=>{
     form.resetFields();
setOpen(!open)
   }
  const handleFinish = (values) => {
    onSubmit(values); // send values back to parent
    console.log(values);
    form.resetFields(); // clear form
    onClose(); // close modal
  };

  return (
    <Modal
      title="Create Item"
      open={open}
      onCancel={onClose}
      footer={null} // we’ll put the submit button inside the form
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
      >
        {/* Title input (required) */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        {/* Description textarea */}
        <Form.Item label="Description" name="description">
          <Input.TextArea
            rows={4}
            rules={[{ required: true, message: "Please enter a title" }]}
            placeholder="Enter description"
          />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
