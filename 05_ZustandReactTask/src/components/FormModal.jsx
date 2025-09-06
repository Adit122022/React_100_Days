import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";

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
      destroyOnHidden
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
          <Input   maxLength={50}  placeholder="Enter title" />
        </Form.Item>

        {/* Description textarea */}
        <Form.Item label="Description" name="description">
          <Input.TextArea
          maxLength={500}
            rows={4}
            rules={[{ required: true, message: "Please enter a title" }]}
            placeholder="Enter description"
          />
        </Form.Item>
        {/* Priority*/}
        <Form.Item label="Priority" name="priority">
         <Select placeholder="Choose Priority">
          <Select.Option value="Highest">Highest</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="lowest">Lowest</Select.Option>
         </Select>
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
