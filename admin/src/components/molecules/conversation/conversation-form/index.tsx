"use client";
import { Button, Collapse, Form, Input, Select, Typography } from "antd";
import { PlusOutlined, MinusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { ConversationType } from "@src/types/interface";
import { useEffect } from "react";

const { Text } = Typography;
const { Panel } = Collapse;

type Props = {
  value: ConversationType["listConver"];
  onChange: (val: ConversationType["listConver"]) => void;
};

const ListConverForm = ({ value = [], onChange }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ listConver: value });
  }, [value]);

  const ListConverItem = ({ name }: { name: number }) => {
    return (
      <>
        <Form.Item
          name={[name, "speaker"]}
          label="Người nói"
          rules={[{ required: true, message: "Chọn người nói" }]}
        >
          <Select placeholder="Chọn người nói">
            <Select.Option value="speakerA">Speaker A</Select.Option>
            <Select.Option value="speakerB">Speaker B</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={[name, "text"]}
          label="Câu hội thoại"
          rules={[{ required: true, message: "Nhập câu thoại" }]}
        >
          <Input.TextArea placeholder="Câu hội thoại" autoSize={{ minRows: 2 }} />
        </Form.Item>

        <Form.Item
          name={[name, "audio"]}
          label="Link audio"
          rules={[{ required: true, message: "Nhập link audio" }]}
        >
          <Input placeholder="Nhập link audio nếu có" />
        </Form.Item>
      </>
    );
  };

  return (
    <div>
      <Text strong style={{ display: "block", marginBottom: 12, fontSize: 16 }}>
        💬 Danh sách câu hội thoại
      </Text>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ listConver: value }}
        onFinish={(values) => {
          onChange(values.listConver);
        }}
      >
        <Form.List name="listConver">
          {(fields, { remove, add }) => (
            <>
              <Collapse accordion>
                {fields.map(({ key, name }) => (
                  <Panel
                    key={key}
                    header={
                      <div className="flex justify-between items-center">
                        <span>{`Câu ${name + 1}`}</span>
                        <Button
                          size="small"
                          danger
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(name);
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    }
                  >
                    <ListConverItem name={name} />
                  </Panel>
                ))}
              </Collapse>

              <Form.Item style={{ marginTop: 12 }}>
                <Button
                  type="dashed"
                  onClick={() => add({ speaker: undefined, text: "", audio: "" })}
                  icon={<PlusOutlined />}
                  style={{ width: "100%" }}
                >
                  Thêm câu thoại
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  style={{ width: "100%" }}
                >
                  Cập nhật thay đổi
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default ListConverForm;
