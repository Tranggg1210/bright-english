"use client";

import "./style.scss";

import { Form, Input, Select, Space, Button, Typography, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExerciseQuestion } from "@src/types/interface";
import { useSearchParams } from "next/navigation";

const { Title } = Typography;

const TYPE_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Image", value: "image" },
];

const DEFAULT_ITEM = (type: "text" | "image") =>
  type === "text" ? { id: uuidv4(), content: "" } : { id: uuidv4(), image: "" };

export interface MatchingFormRef {
  getFormValues: () => any;
}

type Props = {
  exerciseQuestion: ExerciseQuestion[];
  onChange: React.Dispatch<React.SetStateAction<ExerciseQuestion[]>>;
};

const MatchingForm = forwardRef<MatchingFormRef, Props>(
  ({ exerciseQuestion, onChange }, ref) => {
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const [typeColumnInitialized, setTypeColumnInitialized] = useState(false);

    const [typeColumn, setTypeColumn] = useState<{
      leftType: "text" | "image" | null;
      rightType: "text" | "image" | null;
    }>({ leftType: null, rightType: null });

    useImperativeHandle(ref, () => ({
      getFormValues: () => form.getFieldsValue(),
    }));

    useEffect(() => {
      if (
        !typeColumnInitialized &&
        exerciseQuestion &&
        exerciseQuestion.length > 0
      ) {
        const q = exerciseQuestion[0];
        setTypeColumn({
          leftType:
            typeColumn.leftType || q?.dataLeft?.[0]?.content
              ? "text"
              : q?.dataLeft?.[0]?.image
              ? "image"
              : null,
          rightType:
            typeColumn.rightType || q?.dataRight?.[0]?.content
              ? "text"
              : q?.dataRight?.[0]?.image
              ? "image"
              : null,
        });
        setTypeColumnInitialized(true);
      }
    }, [exerciseQuestion, typeColumnInitialized]);

    useEffect(() => {
      if (exerciseQuestion && exerciseQuestion.length > 0) {
        const q = exerciseQuestion[0];
        const dataLeft = q?.dataLeft || [];
        const dataRight = q?.dataRight || [];

        const rightMap = new Map(dataRight.map((item) => [item.key, item]));

        const sortedRight = dataLeft.map((item) => {
          return (
            rightMap.get(item.key) || {
              id: uuidv4(),
              key: item.key,
              ...(typeColumn.rightType === "text"
                ? { content: "" }
                : { image: "" }),
            }
          );
        });

        if (searchParams.get("q")) {
          form.setFieldsValue({
            prompt: q?.prompt || "",
            dataLeft,
            dataRight: sortedRight,
            rightType: typeColumn.rightType,
            leftType: typeColumn.leftType,
          });
        } else {
          form.setFieldsValue({
            prompt: q?.prompt || "",
            dataLeft,
            dataRight: sortedRight,
          });
        }
      }
    }, [exerciseQuestion, typeColumn.rightType]);

    const onLeftTypeChange = (value: "text" | "image") => {
      setTypeColumn((prev) => ({
        leftType: value,
        rightType: prev.rightType,
      }));

      form.setFieldsValue({ dataLeft: [], dataRight: [] });
      onValuesChange(null, {
        prompt: form.getFieldValue("prompt") || "",
        dataLeft: [],
        dataRight: [],
      });
    };

    const onRightTypeChange = (value: "text" | "image") => {
      setTypeColumn((prev) => ({
        leftType: prev.leftType,
        rightType: value,
      }));

      form.setFieldsValue({ dataLeft: [], dataRight: [] });
      onValuesChange(null, {
        prompt: form.getFieldValue("prompt") || "",
        dataLeft: [],
        dataRight: [],
      });
    };

    const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const onValuesChange = (_: any, all: any) => {
      if (!typeColumn) return;

      const left = all.dataLeft || [];
      const right = all.dataRight || [];

      const fixedRight =
        right.length < left.length
          ? [
              ...right,
              ...Array(left.length - right.length)
                .fill(0)
                .map(() => DEFAULT_ITEM(typeColumn.rightType || "text")),
            ]
          : right;

      const dataLeftWithKey = left.map((item: any, i: number) => ({
        id: item.id || uuidv4(),
        key: `${i}`,
        ...(typeColumn.leftType === "text"
          ? { content: item.content || "" }
          : { image: item.image || "" }),
      }));

      const dataRightWithKey = fixedRight.map((item: any, i: number) => ({
        id: dataLeftWithKey[i]?.id || uuidv4(),
        key: `${i}`,
        ...(typeColumn.rightType === "text"
          ? { content: item.content || "" }
          : { image: item.image || "" }),
      }));

      const newQuestions: ExerciseQuestion[] = [
        {
          prompt: all.prompt || "",
          dataLeft: dataLeftWithKey,
          dataRight: dataRightWithKey,
          answer: null,
        },
      ];

      onChange(newQuestions);
    };

    const handleAddPair = () => {
      const current = form.getFieldsValue();
      const newId = uuidv4();

      const newLeft = [
        ...(current.dataLeft || []),
        typeColumn.leftType === "text"
          ? { id: newId, content: "" }
          : { id: newId, image: "" },
      ];
      const newRight = [
        ...(current.dataRight || []),
        typeColumn.rightType === "text"
          ? { id: newId, content: "" }
          : { id: newId, image: "" },
      ];

      form.setFieldsValue({
        dataLeft: newLeft,
        dataRight: newRight,
      });

      onValuesChange(null, {
        ...current,
        dataLeft: newLeft,
        dataRight: newRight,
      });
    };

    return (
      <div className="mt-6 block">
        <Form layout="vertical" form={form} onValuesChange={onValuesChange}>
          <Title level={5}>📋 Tùy chọn định dạng</Title>
          <Row gutter={16} className="mb-2">
            <Col span={12}>
              <Form.Item
                label="Loại dữ liệu bên trái"
                name="leftType"
                rules={[
                  { required: true, message: "Chọn loại dữ liệu bên trái" },
                ]}
              >
                <Select
                  options={TYPE_OPTIONS}
                  value={typeColumn.leftType}
                  onChange={onLeftTypeChange}
                  placeholder="Chọn loại dữ liệu"
                  disabled={!!searchParams.get("q")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại dữ liệu bên phải"
                name="rightType"
                rules={[
                  { required: true, message: "Chọn loại dữ liệu bên phải" },
                ]}
              >
                <Select
                  options={TYPE_OPTIONS}
                  value={typeColumn.rightType}
                  onChange={onRightTypeChange}
                  placeholder="Chọn loại dữ liệu"
                  disabled={!!searchParams.get("q")}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="mb-4">
            <Title level={5}>🔗 Danh sách Matching</Title>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              {typeColumn.leftType ? (
                <Form.List name="dataLeft">
                  {(fields) =>
                    fields.map(({ key, name, ...restField }, idx) => (
                      <div
                        key={key}
                        style={{
                          border: "1px solid #d9d9d9",
                          padding: 12,
                          borderRadius: 6,
                          marginBottom: 8,
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <Space align="center" style={{ width: "100%" }}>
                          <div
                            style={{
                              width: 24,
                              fontWeight: "bold",
                              fontSize: 16,
                              color: "red",
                            }}
                          >
                            {ALPHABETS[idx] || "Z"}
                          </div>
                          <Form.Item
                            {...restField}
                            name={[
                              name,
                              typeColumn.leftType === "text"
                                ? "content"
                                : "image",
                            ]}
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống",
                              },
                            ]}
                            style={{ flex: 1, marginBottom: 0 }}
                          >
                            <Input
                              placeholder={
                                typeColumn.leftType === "text"
                                  ? "Nội dung"
                                  : "Link ảnh"
                              }
                            />
                          </Form.Item>
                        </Space>
                      </div>
                    ))
                  }
                </Form.List>
              ) : (
                <i style={{ color: "gray" }}>
                  Vui lòng chọn loại dữ liệu bên trái để nhập
                </i>
              )}
            </Col>

            <Col span={12}>
              {typeColumn.rightType ? (
                <Form.List name="dataRight">
                  {(fields) =>
                    fields.map(({ key, name, ...restField }, idx) => (
                      <div
                        key={key}
                        style={{
                          border: "1px solid #d9d9d9",
                          padding: 12,
                          borderRadius: 6,
                          marginBottom: 8,
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <Space align="center" style={{ width: "100%" }}>
                          <div
                            style={{
                              width: 24,
                              fontWeight: "bold",
                              fontSize: 16,
                            }}
                          >
                            {idx + 1}
                          </div>
                          <Form.Item
                            {...restField}
                            name={[
                              name,
                              typeColumn.rightType === "text"
                                ? "content"
                                : "image",
                            ]}
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống",
                              },
                            ]}
                            style={{ flex: 1, marginBottom: 0 }}
                          >
                            <Input
                              placeholder={
                                typeColumn.rightType === "text"
                                  ? "Nội dung"
                                  : "Link ảnh"
                              }
                            />
                          </Form.Item>
                        </Space>
                      </div>
                    ))
                  }
                </Form.List>
              ) : (
                <i style={{ color: "gray" }}>
                  Vui lòng chọn loại dữ liệu bên phải để nhập
                </i>
              )}
            </Col>
          </Row>

          <Button
            type="dashed"
            icon={<PlusOutlined />}
            block
            onClick={handleAddPair}
            disabled={!(typeColumn.leftType && typeColumn.rightType)}
            className="mt-3"
          >
            Thêm một cặp trái – phải
          </Button>
        </Form>
      </div>
    );
  }
);

MatchingForm.displayName = "MatchingForm";

export default MatchingForm;
