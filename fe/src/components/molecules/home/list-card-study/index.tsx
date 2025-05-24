"use client";

import "./style.scss";
import HomeCard from "@src/components/atoms/home/home-card";
import { IHomeCard } from "@src/types/interface";
import Bear1 from "@public/images/mascot/bear-ok.png";
import Bear2 from "@public/images/mascot/bear-shock.png";
import Bear3 from "@public/images/mascot/bear-tara.png";
import Bear4 from "@public/images/mascot/bear-try.png";
import Bear5 from "@public/images/mascot/bear-normal.png";
import { useRouter } from "next/navigation";

function ListCardStudy() {
  const router = useRouter();

  const listCardStudy: IHomeCard[] = [
    {
      id: 1,
      title: "Từ vựng",
      description: "Ghi nhớ từ mới nhanh hơn qua hình ảnh trực quan.",
      image: Bear1,
      handleClick: () => {
        router.push("/flashcard");
      },
    },
    {
      id: 2,
      title: "Ngữ pháp",
      description: "Hiểu nhanh, nắm chắc các điểm ngữ pháp quan trọng.",
      image: Bear2,
      handleClick: () => {
        router.push("/grammar");
      },
    },
    {
      id: 3,
      title: "Làm bài tập",
      description: "Luyện tập kiến thức với các bài tập đa dạng.",
      image: Bear3,
      handleClick: () => {
        router.push("/exercises");
      },
    },
    {
      id: 4,
      title: "Luyện nói",
      description: "Phát âm chuẩn hơn với các bài luyện nói cùng AI.",
      image: Bear4,
      handleClick: () => {
        router.push("/speaking");
      },
    },
    {
      id: 5,
      title: "Tiến trình học tập",
      description: "Xem lại quá trình học và đánh giá sự tiến bộ.",
      image: Bear5,
      handleClick: () => {
        router.push("/progress");
      },
    },
  ];

  return (
    <div className="list-card-study">
      <h2 className="title">Cùng học ngay</h2>

      <div className="list-card-study__container">
        {listCardStudy.map((item, index) => (
          <HomeCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ListCardStudy;
