"use client";

import "./style.scss";
import { IHomeCard } from "@src/types/interface";
import ButtonComponent from "../../button";
import Image from "next/image";
import { pastelColors } from "@src/helpers/contant.contant";

function HomeCard({ item }: { item: IHomeCard }) {
  const getRandomPastel = () => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];

  };

  return (
    <div className="home-card">
      <div className="home-card__image">
        <Image
          src={item.image}
          alt="home-card-image"
          width={200}
          height={200}
        />
      </div>
      <div className="home-card__content">
        <h3 className="home-card__title">{item.title}</h3>
        <p className="home-card__description">{item.description}</p>
        <div className="flex justify-end">
          <ButtonComponent
            className="home-card__button opacity-100"
            background={getRandomPastel()}
            color="#fff"
            borderRadius="48px"
            fontSize="12px"
            onClick={item.handleClick}
            padding="8px 16px"
            title="Tiến lên >>"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
