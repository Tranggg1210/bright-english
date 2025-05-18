import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import {
  Form,
  Input,
  Button,
  Collapse,
  Typography,
  Checkbox,
  Space,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Panel } = Collapse;
const { Text } = Typography;

export type MultipleChoiceFormRef = {
  getFormValues: () => { questions: ExerciseQuestion[] };
};

interface MatchItem {
  // dummy placeholder, replace nếu cần
  id?: string;
  text?: string;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Answer {
  options: Option[];
  explain: string;
}

export interface ExerciseQuestion {
  id?: string;
  _id?: string;
  prompt?: string;
  audio?: string;
  dataLeft?: MatchItem[];
  dataRight?: MatchItem[];
  answer: Answer;
  content?: string[];
}

interface MultipleChoiceFormProps {
  questions: ExerciseQuestion[];
  onChange: any;
  onFinish?: (values: { questions: ExerciseQuestion[] }) => void;
}

const MultipleChoiceForm = forwardRef<
  MultipleChoiceFormRef,
  MultipleChoiceFormProps
>(({ questions, onChange, onFinish }, ref) => {
  const [form] = Form.useForm();

  // Thêm id uuid cho câu hỏi và option nếu chưa có
  const addIds = (qs: ExerciseQuestion[]) =>
    qs.map((q) => ({
      ...q,
      id: q.id || uuidv4(),
      answer: {
        options: (q.answer?.options || []).map((opt) => ({
          id: opt.id || uuidv4(),
          text: opt.text || "",
          isCorrect: opt.isCorrect || false,
        })),
        explain: q.answer?.explain || "",
      },
    }));

  useEffect(() => {
    form.setFieldsValue({
      questions:
        questions.length > 0
          ? addIds(questions)
          : [
              {
                id: uuidv4(),
                prompt: "",
                answer: {
                  options: [
                    { id: uuidv4(), text: "", isCorrect: false },
                    { id: uuidv4(), text: "", isCorrect: false },
                    { id: uuidv4(), text: "", isCorrect: false },
                  ],
                  explain: "",
                },
              },
            ],
    });
  }, [questions, form]);

  useImperativeHandle(ref, () => ({
    getFormValues: () => form.getFieldsValue(),
  }));

  const handleValuesChange = (_: any, allValues: any) => {
    if (allValues.questions) {
      const formatted = addIds(allValues.questions);
      onChange(formatted);
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <Text strong style={{ display: "block", marginBottom: 12, fontSize: 16 }}>
          ✅ Danh sách câu hỏi chọn đáp án
        </Text>
      </div>
      <Form
        form={form}
        name="multiple-choice-form"
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
        autoComplete="off"
        layout="vertical"
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              <Collapse accordion style={{ width: "100%" }}>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Panel
                    header={
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Text strong>{`Câu hỏi ${idx + 1}`}</Text>
                        <MinusCircleOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(name);
                          }}
                          style={{ fontSize: 18, color: "red", cursor: "pointer" }}
                        />
                      </div>
                    }
                    key={key}
                  >
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "prompt"]}
                          label="Nội dung câu hỏi"
                          rules={[{ required: true, message: "Nhập nội dung câu hỏi" }]}
                        >
                          <Input.TextArea placeholder="Nhập nội dung câu hỏi" />
                        </Form.Item>

                        <Form.Item {...restField} name={[name, "answer", "explain"]} label="Lời giải (không bắt buộc)">
                          <Input.TextArea rows={3} placeholder="Lời giải" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.List name={[name, "answer", "options"]}>
                          {(optionFields, { add: addOption, remove: removeOption }) => (
                            <>
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() =>
                                    addOption({ id: uuidv4(), text: "", isCorrect: false })
                                  }
                                  icon={<PlusOutlined />}
                                  className="mt-1"
                                >
                                  Thêm đáp án
                                </Button>
                              </Form.Item>

                              {optionFields.map(({ key: optKey, name: optName, ...optRestField }) => (
                                <Space
                                  key={optKey}
                                  style={{ display: "flex", marginBottom: 8 }}
                                  align="baseline"
                                >
                                  <Form.Item
                                    {...optRestField}
                                    name={[optName, "text"]}
                                    rules={[
                                      { required: true, message: "Nhập nội dung đáp án" },
                                    ]}
                                  >
                                    <Input placeholder={`Đáp án ${optName + 1}`} />
                                  </Form.Item>
                                  <Form.Item
                                    {...optRestField}
                                    name={[optName, "isCorrect"]}
                                    valuePropName="checked"
                                  >
                                    <Checkbox>Đúng</Checkbox>
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() => removeOption(optName)}
                                    style={{ color: "red" }}
                                  />
                                </Space>
                              ))}
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                  </Panel>
                ))}
              </Collapse>

              <Form.Item style={{ marginTop: 16 }}>
                <Button
                  type="dashed"
                  onClick={() =>
                    add({
                      id: uuidv4(),
                      prompt: "",
                      answer: {
                        options: [
                          { id: uuidv4(), text: "", isCorrect: false },
                          { id: uuidv4(), text: "", isCorrect: false },
                          { id: uuidv4(), text: "", isCorrect: false },
                        ],
                        explain: "",
                      },
                    })
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
});

MultipleChoiceForm.displayName = "MultipleChoiceForm";

export default MultipleChoiceForm;
