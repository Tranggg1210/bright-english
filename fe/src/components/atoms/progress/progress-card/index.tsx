import "./style.scss";

import Image from "next/image";
import React from "react";
import ButtonComponent from "../../button";
import { ArrowRight } from "@src/components/svgs";

type ProgressCardProps = {
  partTitle: string;
  progress: number;
  total: number;
  greeting: string;
  image: any;
  onClick: () => void;
};

const ProgressCard = ({ item }: { item: ProgressCardProps }) => {
  const progressPercentage = (item.progress / item.total) * 100;

  return (
    <div className="progress-card">
      <div className="progress-header">
        <h2>{item.partTitle}</h2>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="progress-text">{`${item.progress} / ${item.total}`}</span>
        </div>
      </div>
      <div className="progress-bottom">
        <div className="progress-content">
          <Image src={item.image} alt="icon" width={80} height={80} />
          <div className="greeting-bubble">{item.greeting}</div>
        </div>
        <ButtonComponent
          className="continue-button"
          background=""
          borderRadius=""
          color=""
          fontSize=""
          padding=""
          title=""
          icon={ArrowRight}
          onClick={item.onClick}
          classNameInIcon="!mx-0"
        />
      </div>
    </div>
  );
};

export default ProgressCard;
