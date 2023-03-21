import React, { useState } from "react";
import "./index.less";
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Modal,
  Form,
  Input,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import backW from '../../assets/imgs/details/back-w.svg'

const { Header, Content } = Layout;
const { Title } = Typography;

// 管理收获地址
const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <Card>
      <div className="delete">
        <DeleteOutlined onClick={onDelete} style={{ color: "#e36049" }} />
      </div>
      <div className="address_content">
        <Row>
          <Col>
            <p className="name">{address.name}</p>
          </Col>
          <Col>
            <p className="phone">{address.phone}</p>
          </Col>
        </Row>
        <p className="address">{address.address}</p>
      </div>

      <div className="edit">
        <EditOutlined onClick={onEdit} />
      </div>
    </Card>
  );
};

const AddressAll = () => {
  const [addresses, setAddresses] = useState([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const addAddress = () => {
    setVisible(true);
  };

  const handleAddAddress = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingAddress) {
          // 更新地址
          const updatedAddresses = addresses.map((addr) =>
            addr.id === editingAddress.id
              ? { ...editingAddress, ...values }
              : addr
          );
          setAddresses(updatedAddresses);
        } else {
          // 添加新地址
          const newAddress = {
            id: Date.now(),
            ...values,
          };
          setAddresses([...addresses, newAddress]);
        }
        setVisible(false);
        form.resetFields();
        setEditingAddress(null);
        window.scrollTo(0, 0);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const editAddress = (address) => {
    form.setFieldsValue({
      name: address.name,
      phone: address.phone,
      address: address.address,
    });
    setEditingAddress(address);
    setVisible(true);
  };

  return (
    <Layout className="addressall_page">
      <Header>
         <img src={backW} alt=""></img>
        <Title>我的收货地址</Title>
      </Header>
      <Content>
        <Row gutter={[16, 16]}>
          {addresses.map((address) => (
            <Col key={address.id} xs={24} sm={12} md={8} lg={6}>
              <AddressCard
                address={address}
                onEdit={() => editAddress(address)}
                onDelete={() => deleteAddress(address.id)}
              />
            </Col>
          ))}
        </Row>
        <Modal
          title="添加新地址"
          open={visible}
          onOk={handleAddAddress}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="收件人"
              name="name"
              rules={[{ required: true, message: "请输入收件人姓名！" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="手机号码"
              name="phone"
              rules={[
                { required: true, message: "请输入手机号码！" },
                {
                  pattern: /^0[789]0\d{8}$/,
                  message: "请输入有效的手机号码！",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="详细地址"
              name="address"
              rules={[{ required: true, message: "请输入详细地址！" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
        <div className="add_address">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addAddress}
          >
            添加新地址
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AddressAll;
