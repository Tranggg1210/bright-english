"use client";
import "./style.scss";
import Image from "next/image";
import BannerRight from "@public/images/banner-right.png";

type BannerProps = {
  title?: string;
};

function BannerHome({
  title = "Học cho vui vẻ, sống khỏe mỗi ngày, tương lai sáng láng, chẳng ngán chông gai!",
}: BannerProps) {
  return (
    <div className="banner-home">
      <div className="banner-content">{title}</div>
      <div className="banner-image">
        <Image src={BannerRight} alt="banner-image" />
      </div>
    </div>
  );
}

export default BannerHome;
