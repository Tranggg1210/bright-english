import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Form, Input, Button, Collapse, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ExerciseQuestion } from "@src/types/interface";

const { Panel } = Collapse;
const { Text } = Typography;

export type WriteFormRef = {
  getFormValues: () => {
    questions: ExerciseQuestion[];
  };
};

interface WriteFormProps {
  exerciseQuestion: ExerciseQuestion[];
  onChange: (questions: ExerciseQuestion[]) => void;
  onFinish?: (values: { questions: ExerciseQuestion[] }) => void;
}

const WriteForm = forwardRef<WriteFormRef, WriteFormProps>(
  ({ exerciseQuestion, onChange, onFinish }, ref) => {
    const [form] = Form.useForm();

    useEffect(() => {
      form.setFieldsValue({
        questions:
          exerciseQuestion.length > 0
            ? exerciseQuestion
            : [{ prompt: "", answer: { text: "", explain: "" } }],
      });
    }, [exerciseQuestion, form]);

    useImperativeHandle(ref, () => ({
      getFormValues: () => form.getFieldsValue(),
    }));

    const handleValuesChange = (_: any, allValues: any) => {
      if (allValues.questions) {
        onChange(allValues.questions);
      }
    };

    return (
      <div className="mt-6">
        <div className="mb-6">
          <Text
            strong
            style={{ display: "block", marginBottom: 12, fontSize: 16 }}
          >
            ✍️ Danh sách câu hỏi dạng viết
          </Text>
        </div>
        <Form
          form={form}
          name="write-form"
          onFinish={onFinish}
          onValuesChange={handleValuesChange}
          autoComplete="off"
          layout="vertical"
          style={{ margin: "auto" }}
        >
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                <Collapse accordion style={{ width: "100%" }}>
                  {fields.map(({ key, name, ...restField }, idx) => (
                    <Panel
                      header={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Text strong>{`Câu hỏi ${idx + 1}`}</Text>
                          <MinusCircleOutlined
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(name);
                            }}
                            style={{
                              fontSize: 18,
                              color: "red",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      }
                      key={key}
                    >
                      <div style={{ display: "flex", gap: 16 }}>
                        <Form.Item
                          {...restField}
                          name={[name, "prompt"]}
                          label="Câu hỏi"
                          rules={[{ required: true, message: "Nhập prompt" }]}
                          style={{ flex: 1 }}
                        >
                          <Input.TextArea
                            rows={3}
                            placeholder={`Nhập prompt câu hỏi #${idx + 1}`}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "answer", "text"]}
                          label="Đáp án"
                          rules={[{ required: true, message: "Nhập đáp án" }]}
                          style={{ flex: 1 }}
                        >
                          <Input.TextArea rows={3} placeholder="Nhập đáp án" />
                        </Form.Item>
                      </div>

                      <Form.Item
                        {...restField}
                        name={[name, "answer", "explain"]}
                        label="Lời giải"
                        rules={[]} // không bắt buộc
                      >
                        <Input.TextArea
                          rows={3}
                          placeholder="Lời giải (không bắt buộc)"
                        />
                      </Form.Item>
                    </Panel>
                  ))}
                </Collapse>

                <Form.Item style={{ marginTop: 16 }}>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({ prompt: "", answer: { text: "", explain: "" } })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm câu hỏi
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    );
  }
);

WriteForm.displayName = "WriteForm";

export default WriteForm;
