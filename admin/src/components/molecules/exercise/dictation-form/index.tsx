import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { Form, Input, Button, Collapse, Typography, Upload } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { uploadFile } from "@src/services/upload";
import { useAppDispatch } from "@src/hooks/useHookReducers";

const { Panel } = Collapse;
const { Text } = Typography;

export type DictationFormRef = {
  getFormValues: () => { questions: any[] };
};

interface DictationFormProps {
  questions: any[];
  onChange: (questions: any[]) => void;
  onFinish?: (values: { questions: any[] }) => void;
}

const DictationForm = forwardRef<DictationFormRef, DictationFormProps>(
  ({ questions, onChange, onFinish }, ref) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    useEffect(() => {
      form.setFieldsValue({
        questions:
          questions?.length > 0
            ? questions
            : [{ audio: "", answer: { text: "", explain: "" } }],
      });
    }, [questions, form]);

    useImperativeHandle(ref, () => ({
      getFormValues: () => form.getFieldsValue(),
    }));

    const handleValuesChange = (_: any, allValues: any) => {
      if (allValues.questions) {
        onChange(allValues.questions);
      }
    };

    const beforeUpload = (file: File, index: number) => {
      const isAudio = file.type.startsWith("audio/");
      if (!isAudio) {
        toast.dismiss();
        toast.error("Chỉ được phép upload file âm thanh!");
        return Upload.LIST_IGNORE;
      }
      uploadAudio(file, index);
      return false;
    };

    const uploadAudio = async (file: File, index: number) => {
      setUploadingIndex(index);
      try {
        const { url }: any = await dispatch(uploadFile(file)).unwrap();
        const currentQuestions = form.getFieldValue("questions") || [];
        currentQuestions[index] = {
          ...currentQuestions[index],
          audio: url,
        };
        form.setFieldsValue({ questions: currentQuestions });
        onChange(currentQuestions);
        toast.dismiss();
        toast.success("Upload thành công");
      } catch {
        toast.dismiss();

        toast.error("Upload thất bại");
      } finally {
        setUploadingIndex(null);
      }
    };

    return (
      <div className="mt-6">
        <div className="mb-6">
          <Text
            strong
            style={{ display: "block", marginBottom: 12, fontSize: 16 }}
          >
            🎧 Danh sách câu hỏi dạng nghe chép
          </Text>
        </div>
        <Form
          form={form}
          name="dictation-form"
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
                      <Form.Item
                        label="Link audio"
                        {...restField}
                        name={[name, "audio"]}
                        rules={[
                          {
                            required: true,
                            message: "Phải có link audio hoặc upload file",
                          },
                          { type: "url", message: "Phải là link hợp lệ" },
                        ]}
                      >
                        <Input placeholder="Nhập link audio hoặc upload file bên dưới" />
                      </Form.Item>

                      <Form.Item label="Hoặc tải file audio lên">
                        <Upload
                          beforeUpload={(file) => beforeUpload(file, idx)}
                          maxCount={1}
                          accept="audio/*"
                          showUploadList={false}
                        >
                          <Button
                            loading={uploadingIndex === idx}
                            icon={<UploadOutlined />}
                          >
                            {uploadingIndex === idx
                              ? "Đang upload..."
                              : "Click để tải file lên"}
                          </Button>
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "answer", "text"]}
                        label="Đáp án"
                        rules={[{ required: true, message: "Nhập đáp án" }]}
                      >
                        <Input.TextArea rows={3} placeholder="Nhập đáp án" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "answer", "explain"]}
                        label="Lời giải (không bắt buộc)"
                      >
                        <Input.TextArea rows={3} placeholder="Lời giải" />
                      </Form.Item>
                    </Panel>
                  ))}
                </Collapse>

                <Form.Item style={{ marginTop: 16 }}>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({ audio: "", answer: { text: "", explain: "" } })
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

DictationForm.displayName = "DictationForm";

export default DictationForm;
