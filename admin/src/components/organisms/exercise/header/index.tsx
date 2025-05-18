"use client";

import { Form, Input, Select, Collapse } from "antd";
import { useEffect } from "react";
import { ExerciseHeaderTopic, TopicType } from "@src/types/interface";
import { EXERCISE_TYPE_OPTIONS } from "@src/constants/constants.contant";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import _ from "lodash";
import { getListTopic } from "@src/services/topic";
import { toast } from "react-toastify";

type Props = {
  exerciseTitle: ExerciseHeaderTopic;
  onChange: (value: ExerciseHeaderTopic) => void;
  type?: "write" | "match" | "dictation" | "multiple_choice";
};

const CommonExercise = ({ exerciseTitle, onChange, type }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { topics } = useAppSelector((state) => state.topics);

  useEffect(() => {
    if (!exerciseTitle && topics.length > 0) {
      const defaultData: ExerciseHeaderTopic = {
        name: "",
        text: "",
        type: type || "match",
        topicId: topics[0]._id,
      };
      form.setFieldsValue(defaultData);
      onChange(defaultData);
    }
  }, [topics, exerciseTitle]);

  useEffect(() => {
    if (exerciseTitle) {
      form.setFieldsValue({
        name: exerciseTitle.name,
        text: exerciseTitle.text,
        type: exerciseTitle.type || type,
        topicId: exerciseTitle.topicId || topics?.[0]?._id,
      });
    }
  }, [exerciseTitle]);

  const loaderData = async () => {
    try {
      const params = {
        limit: 19,
        page: 1,
      };
      await dispatch(getListTopic(params)).unwrap();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Không thể lấy danh sách chủ đề!");
    }
  };

  useEffect(() => {
    if (!topics || _.isEmpty(topics)) {
      const shouldFetchTopics = _.isEmpty(topics);
      if (shouldFetchTopics) {
        loaderData();
      }
    }
  }, []);

  const onValuesChange = (_: any, allValues: any) => {
    const updatedExercise: ExerciseHeaderTopic = {
      ...exerciseTitle,
      ...allValues,
    };
    onChange(updatedExercise);
  };

  return (
    <Collapse
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: "📝 Thông tin chung",
          children: (
            <Form layout="vertical" form={form} onValuesChange={onValuesChange}>
              <Form.Item
                name="name"
                label="Tên bài tập"
                rules={[{ required: true, message: "Không được để trống tên" }]}
              >
                <Input placeholder="Nhập tên bài tập" />
              </Form.Item>

              <Form.Item name="text" label="Mô tả / đề bài chung">
                <Input.TextArea placeholder="Nhập mô tả ngắn gọn" rows={3} />
              </Form.Item>

              {!type && (
                <Form.Item
                  name="type"
                  label="Loại bài tập"
                  rules={[{ required: true, message: "Chọn loại bài tập" }]}
                >
                  <Select
                    placeholder="Chọn loại bài tập"
                    options={EXERCISE_TYPE_OPTIONS}
                    disabled={!!exerciseTitle?.type}
                  />
                </Form.Item>
              )}

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
          ),
        },
      ]}
    />
  );
};

export default CommonExercise;
