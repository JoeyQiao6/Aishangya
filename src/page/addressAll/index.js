import React, { useState, useEffect, useRef } from "react";
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
  Select,
  Checkbox,
  message
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import backW from '../../assets/imgs/details/back-w.svg'
import instance from '../../service/request';
const { Option } = Select;
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
            <p className="name">{address.receive}</p>
          </Col>
          <Col>
            <p className="phone">{address.phone}</p>
          </Col>
        </Row>
        <p className="address">{address.postcode} {address.prefecture} {address.city} {address.town} {address.address}</p>
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
  const [option, setOption] = useState([]);
  const [socialType, setSocialType] = useState([])
  const [def, setDef] = useState(false)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { confirm } = Modal;
  const addAddress = () => {
    form.setFieldsValue({
      id: "",
      receive: "",
      phone: "",
      socialtype: "0",
      socialaccount: "",
      postcode: "",
      prefecture: "",
      city: "",
      town: "",
      address: "",
      building: "",
      roomnumber: "",
      state: "",
    });
    setVisible(true);
  };
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    instance.post('/apis/common/dictionary/queryByGroupIds', ["social_type"]).then((val) => {
      if (val.status === 200) {
        setSocialType(val.data.social_type)
      }
    })
    initAddress()
  }, [])
  const initAddress = () => {
    instance.post('/apis/youshan-m/merchantaddress/queryByUname').then((val) => {
      if (val.data.success) {
        setAddresses([])
        setAddresses(val.data.results)
      }
    })
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [stateAddAddress, setStateAddAddress] = useState(false)
  const handleAddAddress = () => {
    if (stateAddAddress) return
    setStateAddAddress(true)
    form
      .validateFields()
      .then((values) => {
        let add = {}
        if (editingAddress) {
          // 更新地址
          const updatedAddresses = addresses.map((addr) =>
            addr.id === editingAddress.id
              ? { ...editingAddress, ...values }
              : addr
          );
          add = updatedAddresses.filter((addr) => addr.id === editingAddress.id)[0]
          setAddresses(updatedAddresses);
        } else {
          // 添加新地址
          const newAddress = {
            id: "",
            ...values,
          };
          add = newAddress
          setAddresses([...addresses, newAddress]);
        }
        instance.post('/apis/youshan-m/merchantaddress/saveAddress', add).then((val) => {
          messageApi.open({
            type: 'success',
            content: '保存成功',
          });
          setStateAddAddress(false)
          setVisible(false);
          form.resetFields();
          setEditingAddress(null);
          window.scrollTo(0, 0);
          initAddress()
        })
      })
      .catch((info) => {
        messageApi.open({
          type: 'error',
          content: '保存失败，请联系客服',
        });
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteAddress = (id) => {
    confirm({
      title: '你确定要删除吗？',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        instance.post('/apis/youshan-m/merchantaddress/delAddress', { id }).then((val) => {
          if (val.data.success) {
            messageApi.open({
              type: 'success',
              content: '删除成功',
            });
            setAddresses(addresses.filter((addr) => addr.id !== id));
          }
        })
      },
      onCancel() {
      },
    });

  };

  const editAddress = (address) => {
    form.setFieldsValue({
      id: address.id,
      receive: address.receive,
      phone: address.phone,
      socialtype: address.socialtype,
      socialaccount: address.socialaccount,
      postcode: address.postcode,
      prefecture: address.prefecture,
      city: address.city,
      town: address.town,
      address: address.address,
      building: address.building,
      roomnumber: address.roomnumber,
      state: address.state,
    });
    setEditingAddress(address);
    setVisible(true);
    setDef(address.state === 1)
  };
  const reqPost = (event) => {
    const value = event.target.value
    if (value.length > 3) {
      const postPara = {
        page: 1,
        rows: 100,
        //查询条件
        condition: {
          //查询条件
          postcode: value,
        },
        sort: {
          prop: "",
          order: "",
        }
      }
      instance.post('/apis/youshan-m/postcode/selectByParam', postPara).then((val) => {
        //val是后端返回来的数据
        if (val.data.success) {
          val = val.data.results
          setOption(val)
          if (val.length > 0) {
            form.setFieldsValue({
              "prefecture": val[0].prefecture,
              "city": val[0].city,
              "town": val[0].town,
            });
          }
        }
      })
    }

  }
  const changeDef = () => {
    form.setFieldsValue({
      "state": def ? 0 : 1,
    });
    setDef(!def)
  }
  return (
    <Layout className="addressall_page">
      {contextHolder}
      <Header >
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
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
          title="编辑地址"
          open={visible}
          onOk={handleAddAddress}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" initialValues={{
            socialtype: '0',
          }} >
            <Form.Item
              label="收件人"
              name="receive"
              rules={[{ required: true, message: "请输入收件人姓名！" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮政编码"
              name="postcode"
              rules={[{ required: true, message: "请输入邮政编码！" }]}
              onBlur={reqPost}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="辖区"
              name="prefecture"
              rules={[{ required: true, message: "请选择辖区！" }]}
            >
              <Select
                placeholder="请选择辖区"
              >
                {option.map((op) => (
                  <Option key={op?.id} value={op?.prefecture}>
                    {op?.prefecture}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="市区"
              name="city"
              rules={[{ required: true, message: "请选择市区！" }]}
            >
              <Select
                placeholder="请选择市区"
              >
                {option.map((op) => (
                  <Option key={op?.id} value={op?.city}>
                    {op?.city}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="町村"
              name="town"
              rules={[{ required: true, message: "请选择町村！" }]}
            >
              <Select
                placeholder="请选择町村"
              >
                {option.map((op) => (
                  <Option key={op?.id} value={op?.town}>
                    {op?.town}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="丁目・番地・号（半角数字)"
              name="address"
              rules={[
                { required: true, message: "请输入「丁目・番地・号（半角数字)」！" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="房间号码"
              name="roomnumber"
              rules={[
                { required: true, message: "请输入房间号码！" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="公寓名称或公司名称"
              name="building"
              rules={[
                { required: true, message: "请输入公寓名称或公司名称！" },
              ]}
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
              label="社交APP"
              name="socialtype"
            >
              <Select
                placeholder="请选择社交APP"
              >
                {socialType.map((op) => (
                  <Option key={op?.id} value={op?.value}>
                    {op?.display}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="社交账号"
              name="socialaccount"
            >
              <Input />
            </Form.Item>
            <Form.Item label="是否设置为默认地址" name="state" valuePropName="checked">
              <Checkbox checked={def} onChange={changeDef} />
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
    </Layout >
  );
};
export default AddressAll;
