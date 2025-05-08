import "./style.scss";
import Image from "next/image";

const timelineData = [
  {
    id: 1,
    text: "Học từ vựng mỗi ngày",
    align: "left",
    img: "/images/timeline-1.jpg",
  },
  {
    id: 2,
    text: "Làm bài tập tương tác",
    align: "right",
    img: "/images/timeline-3.jpg",
  },
  {
    id: 3,
    text: "Luyện nghe - nói với AI",
    align: "left",
    img: "/images/timeline-2.jpg",
  },
];

function VerticalTimeline() {
  return (
    <div className="landing-timeline">
      <h1 className="h1-title">Quy trình học tiếng anh hiệu quả 😜</h1>
      <div className="timeline">
        <div className="timeline-circle orange">Bắt đầu</div>

        <div className="timeline-line"></div>

        {timelineData.map((item) => (
          <div
            key={item.id}
            className={`timeline-item ${
              item.align === "left" ? "left" : "right"
            }`}
          >
            <div className="timeline-text">{item.text}</div>

            <div className="timeline-img">
              <Image
                src={item.img}
                alt={`Step ${item.id}`}
                width={64}
                height={64}
              />
            </div>
          </div>
        ))}

        <div className="timeline-circle orange">Kết thúc</div>
      </div>
    </div>
  );
}

export default VerticalTimeline;
