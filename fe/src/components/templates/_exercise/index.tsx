"use client";

import "./style.scss";
import { Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getListTopic } from "@src/services/flashcard";
import { ITopic, IExercise } from "@src/types/interface";
import Loading from "@src/components/atoms/loading";
import useNotification from "@src/hooks/useNotification";
import EmptyPage from "@src/components/organisms/_empty-page";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { getListExerciseByTopicId } from "@src/services/exercise";
import { typeMap } from "@src/helpers/contant.contant";
import { useRouter } from "next/navigation";

function Exercise() {
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const router = useRouter();
  const [exercisesByTopic, setExercisesByTopic] = useState<
    Record<string, IExercise[]>
  >({});
  const [loadingTopicId, setLoadingTopicId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoadingTopics(true);
        const res = await dispatch(
          getListTopic({ page: 1, limit: 19 })
        ).unwrap();
        if (res?.data?.topics) setTopics(res.data.topics);
      } catch (err) {
        notify("error", "Không thể tải danh sách chủ đề!");
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  const handleLoadExercises = async (topicId: string) => {
    if (exercisesByTopic[topicId]) return;
    try {
      setLoadingTopicId(topicId);
      const res = await dispatch(
        getListExerciseByTopicId({
          id: topicId,
        })
      ).unwrap();
      setExercisesByTopic((prev) => ({
        ...prev,
        [topicId]: res.data.exercises,
      }));
    } catch (err) {
      notify("error", "Lỗi khi tải bài tập!");
    } finally {
      setLoadingTopicId(null);
    }
  };

  const handleOpenExercise = (id: string) => {
    if (!id) return;
    router.push(`/detail-exercise/${id}`);
  };

  if (loadingTopics) return <Loading />;
  if (topics.length === 0)
    return (
      <EmptyPage
        title="Không có chủ đề"
        description="Hãy thử lại sau nha!"
        showButton={false}
      />
    );

  return (
    <div className="exercise">
      <div className="exercise-left"></div>
      <div className="exercise-right">
        <Accordion>
          {topics.map((topic, idx) => (
            <Accordion.Item eventKey={String(idx)} key={topic._id}>
              <Accordion.Header onClick={() => handleLoadExercises(topic._id)}>
                {topic.name}
              </Accordion.Header>
              <Accordion.Body>
                {loadingTopicId === topic._id ? (
                  <Loading />
                ) : exercisesByTopic[topic._id]?.length ? (
                  <ul>
                    {exercisesByTopic[topic._id].map((ex) => (
                      <li
                        key={ex._id}
                        onClick={() => handleOpenExercise(ex._id || "")}
                      >
                        <div className="exercise-name">{ex.name}</div>
                        <div className="exercise-type">
                          Dạng bài: {typeMap[ex.type] || ex.type}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="exercise-not">Không có bài tập.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Exercise;
