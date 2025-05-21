"use client";
import "./style.scss";
import Image from "next/image";
import BannerRight from "@public/images/banner-right.png";

type BannerProps = {
  title?: string;
};

function BannerHome({
  title = "Học tập giúp bạn cải thiện cuộc sống của mình và tạo ra sự khác biệt đáng kể",
}: BannerProps) {
  return (
    <div className="banner">
      <div className="banner-content">{title}</div>
      <div className="banner-image">
        <Image src={BannerRight} alt="banner-image" />
      </div>
    </div>
  );
}

export default BannerHome;
