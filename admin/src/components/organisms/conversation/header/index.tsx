"use client";

import { Form, Input, Select, Collapse } from "antd";
import { useEffect } from "react";
import { TopicType } from "@src/types/interface";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import _ from "lodash";
import { getListTopic } from "@src/services/topic";
import { toast } from "react-toastify";

const { Panel } = Collapse;

type ConversationHeaderType = {
  name: string;
  description?: string;
  topicId: string;
};

type Props = {
  value: ConversationHeaderType;
  onChange: (value: ConversationHeaderType) => void;
};

const ConversationHeader = ({ value, onChange }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { topics } = useAppSelector((state) => state.topics);

  useEffect(() => {
    if (!topics || _.isEmpty(topics)) {
      const fetchTopics = async () => {
        try {
          await dispatch(getListTopic({ limit: 19, page: 1 })).unwrap();
        } catch {
          toast.dismiss();
          toast.error("Không thể lấy danh sách chủ đề!");
        }
      };
      fetchTopics();
    }
  }, [topics]);

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        name: value.name,
        description: value.description,
        topicId: value.topicId || topics?.[0]?._id,
      });
    }
  }, [value, form, topics]);

  const onValuesChange = (_: any, allValues: any) => {
    onChange({ ...value, ...allValues });
  };

  return (
    <Collapse accordion>
      <Panel key="1" header="💬 Thông tin đoạn hội thoại">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={onValuesChange}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Tên đoạn hội thoại"
            rules={[{ required: true, message: "Không được để trống tên" }]}
          >
            <Input placeholder="Nhập tên đoạn hội thoại" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea placeholder="Nhập mô tả (nếu có)" rows={3} />
          </Form.Item>

          <Form.Item
            label="Chủ đề"
            name="topicId"
            rules={[{ required: true, message: "Chọn chủ đề" }]}
          >
            <Select placeholder="Chọn chủ đề">
              {topics.map((item: TopicType) => (
                <Select.Option value={item._id} key={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default ConversationHeader;
