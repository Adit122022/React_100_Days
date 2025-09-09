import { Button, Form, Input, Modal, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}


const ModalForm = ({ showModal, setShowModal, setQrCode }) => {
  const [form] = Form.useForm()

const getFormData = async (values) => {
  let iconUrl = null;
  console.log(values)

  if (values.icon && values.icon.length > 0 && values.icon[0].originFileObj) {
    // Convert uploaded file (Blob) to Base64
    iconUrl = await getBase64(values.icon[0].originFileObj);
  }

  setQrCode({
    url: values.url,
    icon: iconUrl,
    bgColor: values.bgColor,
    color: values.color,
  });

  form.resetFields();
  setShowModal(false);
};




  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={null}
      centered
      destroyOnClose
      className="rounded-xl"
    >
      <div className="p-2">
        <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Customize Your QR Code 🎨
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={getFormData}
          autoComplete="off"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* URL */}
          <Form.Item
            label={<span className="font-medium">🔗 Website / Link</span>}
            name="url"
            rules={[{ required: true, type: "url", message: "Enter a valid URL" }]}
            className="col-span-2"
          >
            <Input
              size="large"
              placeholder="https://example.com"
              className="rounded-lg shadow-sm"
            />
          </Form.Item>

          {/* QR Color */}
          <Form.Item
            label={<span className="font-medium">🎨 QR Code Color</span>}
            name="color"
            initialValue="#000"
          >
            <Input type="color" size="large" className="rounded-lg cursor-pointer h-12" />
          </Form.Item>

          {/* Background Color */}
          <Form.Item
            label={<span className="font-medium">🌈 Background Color</span>}
            name="bgColor"
            initialValue="#fffff"
          >
            <Input type="color" size="large" className="rounded-lg cursor-pointer h-12" />
          </Form.Item>

          {/* Logo Upload */}
       <Form.Item
  label={<span className="font-medium">🖼️ Logo (optional)</span>}
  name="icon"
  valuePropName="fileList"
  getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
  className="col-span-2"
>
  <Upload
    maxCount={1}
    listType="picture-card"
    accept="image/*"
    beforeUpload={() => false}
    className="w-full"
  >
    <div className="text-sm text-gray-600">
      <UploadOutlined /> Upload Logo
    </div>
  </Upload>
</Form.Item>


          {/* Submit Button */}
          <Form.Item className="col-span-2">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-none shadow-md hover:opacity-90"
            >
              🚀 Generate QR
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalForm
