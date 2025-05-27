"use client";

import "./style.scss";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MatchedPair, MatchItem } from "@src/types/interface";
import Image from "next/image";
import { CancelX, CheckCorrect, Link } from "@src/components/svgs";

interface Props {
  dataLeft: MatchItem[];
  dataRight: MatchItem[];
  matchedPairs: MatchedPair[];
  setMatchedPairs: React.Dispatch<React.SetStateAction<MatchedPair[]>>;
  isLearned?: boolean;
}

export default function MatchingExercise({
  dataLeft,
  dataRight,
  matchedPairs,
  setMatchedPairs,
  isLearned = true,
}: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const findLeftItem = (id: string) => dataLeft.find((i) => i.id === id);
  const findRightItem = (id: string) => dataRight.find((i) => i.id === id);

  const handleSelectLeft = (id: string) => {
    setSelectedLeft(selectedLeft === id ? null : id);
  };

  const handleSelectRight = (id: string) => {
    setSelectedRight(selectedRight === id ? null : id);
  };

  const tryMakePair = () => {
    if (!selectedLeft || !selectedRight) return;

    const alreadyMatched = matchedPairs.some(
      (p) => p.left.id === selectedLeft || p.right.id === selectedRight
    );
    if (alreadyMatched) return;

    const leftItem = findLeftItem(selectedLeft);
    const rightItem = findRightItem(selectedRight);
    if (!leftItem || !rightItem) return;

    setTimeout(() => {
      setMatchedPairs((prev) => [
        ...prev,
        { left: leftItem, right: rightItem },
      ]);
    }, 100);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const removePair = (leftId: string, rightId: string, isCorrect?: boolean) => {
    if (isCorrect !== undefined) return;

    setMatchedPairs((prev) =>
      prev.filter((p) => !(p.left.id === leftId && p.right.id === rightId))
    );
  };

  const clearAllPairs = () => setMatchedPairs([]);

  const filteredLeft = dataLeft.filter(
    (item) => !matchedPairs.some((p) => p.left?.id === item?.id)
  );
  const filteredRight = dataRight.filter(
    (item) => !matchedPairs.some((p) => p.right?.id === item?.id)
  );

  tryMakePair();

  return dataLeft.length > 0 && dataRight.length > 0 ? (
    <div className="matching-exercise">
      {matchedPairs.length > 0 && !isLearned && (
        <div className="btn-actions">
          <Button variant="danger" onClick={clearAllPairs}>
            Bỏ nối tất cả
          </Button>
        </div>
      )}

      <div className="matched-pairs">
        {matchedPairs.map(({ left, right, isCorrect }) => {
          const resultClass =
            isCorrect === undefined
              ? "unverified"
              : isCorrect
              ? "correct"
              : "incorrect";

          const resultClassIcon =
            isCorrect === undefined
              ? ""
              : isCorrect
              ? "correct-icon"
              : "incorrect-icon";

          return (
            <div key={left.id + right.id} className={`pair ${resultClass}`}>
              <div
                className={`item ${
                  left.image ? "with-image" : ""
                } ${resultClassIcon}`}
              >
                {left.image && (
                  <Image
                    src={left.image}
                    alt={left.content}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                )}
                <div>{left.content}</div>
              </div>

              <button
                aria-label="Bỏ nối"
                title="Bỏ nối"
                onClick={() => removePair(left.id, right.id, isCorrect)}
                className={`remove-pair ${resultClassIcon}`}
              >
                {isCorrect === undefined ? (
                  <Image src={Link} alt="" width={16} height={16}></Image>
                ) : isCorrect ? (
                  <Image
                    src={CheckCorrect}
                    alt=""
                    width={16}
                    height={16}
                  ></Image>
                ) : (
                  <Image src={CancelX} alt="" width={16} height={16}></Image>
                )}
              </button>

              <div
                className={`item ${
                  right.image ? "with-image" : ""
                } ${resultClassIcon}`}
              >
                {right.image && (
                  <Image
                    src={right.image}
                    alt={right.content}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                )}
                <div>{right.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="columns">
        <div className="column">
          {filteredLeft.map((item) => {
            const selected = selectedLeft === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectLeft(item.id)}
                className={`item ${item?.image ? "with-image" : ""} ${
                  selected ? "selected" : ""
                }`}
              >
                {item.image && (
                  <Image
                    src={item?.image}
                    alt={item.content}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                )}
                <div>{item.content}</div>
              </div>
            );
          })}
        </div>

        <div className="column">
          {filteredRight.map((item) => {
            const selected = selectedRight === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectRight(item.id)}
                className={`item ${item.image ? "with-image" : ""} ${
                  selected ? "selected" : ""
                }`}
              >
                {item.image && (
                  <Image
                    src={item?.image}
                    alt={item.content}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                )}
                <div>{item.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
}
