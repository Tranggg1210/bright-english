"use client";

import "./style.scss";
import { Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getListTopic } from "@src/services/flashcard";
import { ITopic, IConversation } from "@src/types/interface";
import Loading from "@src/components/atoms/loading";
import useNotification from "@src/hooks/useNotification";
import EmptyPage from "@src/components/organisms/_empty-page";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { useRouter } from "next/navigation";
import Session from "@src/helpers/session";
import { getListConversationByTopicId } from "@src/services/conversation";

function Conversations() {
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const router = useRouter();
  const [conversationsByTopic, setConversationsByTopic] = useState<
    Record<string, IConversation[]>
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

  const handleLoadConversations = async (topicId: string) => {
    if (conversationsByTopic[topicId]) return;
    try {
      setLoadingTopicId(topicId);
      const res = await dispatch(
        getListConversationByTopicId({
          id: topicId,
        })
      ).unwrap();
      setConversationsByTopic((prev) => ({
        ...prev,
        [topicId]: res.data.conversations,
      }));
    } catch (err) {
      setConversationsByTopic((prev) => ({
        ...prev,
        [topicId]: [],
      }));
      // notify("error", "Lỗi khi tải bài tập!");
    } finally {
      setLoadingTopicId(null);
    }
  };

  const handleOpenConversation = (id: string, idTopic: string, indx: number) => {
    if (!id) return;
    const allIds = conversationsByTopic[idTopic].map(item => item._id);
    Session.setSession("list-conversation", allIds);
    router.push(`/detail-conversation/${id}?i=${indx}`);
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
    <div className="conversation">
      <div className="conversation-left"></div>
      <div className="conversation-right">
        <Accordion>
          {topics.map((topic, idx) => (
            <Accordion.Item eventKey={String(idx)} key={topic._id}>
              <Accordion.Header onClick={() => handleLoadConversations(topic._id)}>
                {topic.name}
              </Accordion.Header>
              <Accordion.Body>
                {loadingTopicId === topic._id ? (
                  <Loading />
                ) : conversationsByTopic[topic._id]?.length ? (
                  <ul>
                    {conversationsByTopic[topic._id].map((ex, indx) => (
                      <li
                        key={ex._id}
                        onClick={() =>
                          handleOpenConversation(ex._id || "", topic._id, indx)
                        }
                      >
                        <div className="conversation-name">{ex.name}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="conversation-not">Không có bài hội thoại.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Conversations;
