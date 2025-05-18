"use client";
import { Collapse, Form, Input, Row, Col } from "antd";
import { ConversationType } from "@src/types/interface";

const { Panel } = Collapse;

type Props = {
  value: ConversationType["listInfor"];
  onChange: (val: ConversationType["listInfor"]) => void;
};

const ListInforForm = ({ value = {
    speakerA: {
        avatar: "",
        name: ""
    },
    speakerB: {
        avatar: "",
        name: ""
    }
}, onChange }: Props) => {
  const [form] = Form.useForm();
  return (
    <div className="my-6">
      <Collapse>
        <Panel header="👥 Thông tin người tham gia" key="1">
          <Form
            layout="vertical"
            form={form}
            initialValues={value}
            onValuesChange={(_, allValues) => onChange(allValues)}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thông tin Speaker A">
                  <Form.Item
                    name={["speakerA", "name"]}
                    label="Tên"
                    rules={[{ required: true, message: "Nhập tên Speaker A" }]}
                  >
                    <Input placeholder="Tên A" />
                  </Form.Item>
                  <Form.Item
                    name={["speakerA", "avatar"]}
                    label="Avatar"
                    style={{ marginTop: 12 }}
                    rules={[{ required: true, message: "Nhập link avatar Speaker A" }]}
                  >
                    <Input placeholder="Link avatar A" />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Thông tin Speaker B">
                  <Form.Item
                    name={["speakerB", "name"]}
                    label="Tên"
                    rules={[{ required: true, message: "Nhập tên Speaker B" }]}
                  >
                    <Input placeholder="Tên B" />
                  </Form.Item>
                  <Form.Item
                    name={["speakerB", "avatar"]}
                    label="Avatar"
                    style={{ marginTop: 12 }}
                    rules={[{ required: true, message: "Nhập link avatar Speaker B" }]}
                  >
                    <Input placeholder="Link avatar B" />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ListInforForm;
