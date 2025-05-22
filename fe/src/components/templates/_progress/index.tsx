"use client";

import "./style.scss";
import { useMemo, useRef } from "react";
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartArea,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import Bear1 from "@public/images/mascot/bear-ok.png";
import Bear2 from "@public/images/mascot/bear-normal.png";
import Bear3 from "@public/images/mascot/bear-tara.png";
import ProgressCard from "@src/components/atoms/progress/progress-card";
import { useGetProgress } from "@src/hooks/useGetProgress";
import { useRouter } from "next/navigation";

function LearningProgress() {
  const chartRef = useRef<ChartJS<"line">>(null);
  const router = useRouter();
  const progresData: any = useGetProgress();

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea | null
  ) => {
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(1, "rgba(255, 243, 216, 0.8)");
    gradient.addColorStop(0, "rgba(255, 210, 97, 0)");

    return gradient;
  };

  const data = {
    labels: ["18/02", "19/02", "20/02", "21/02", "22/02", "23/02"],
    datasets: [
      {
        data: [1, 2, 1.5, 2.5, 2, 5, 6],
        label: "Điểm",
        borderColor: "#FFC535",
        borderWidth: 1,
        backgroundColor: function (
          context: ScriptableContext<"line">
        ): string | CanvasGradient | undefined {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return undefined;
          }
          return getGradient(ctx, chartArea) || undefined;
        },
        fill: true,
      },
    ],
  };

  const learningProgressData = useMemo(
    () => [
      {
        partTitle: "Từ vựng",
        progress: progresData?.vocabulary?.done || 0,
        total: progresData?.vocabulary?.total ||  461,
        greeting: "Học từ vựng nào!",
        image: Bear1,
        onClick: () => router.push("/flashcard"),
      },
      {
        partTitle: "Bài tập",
        progress: progresData?.exercise?.done || 0,
        total:  progresData?.exercise?.total || 0,
        greeting: "Làm bài tập nhé!",
        image: Bear2,
        onClick: () =>  router.push("/exercises"),
      },
      {
        partTitle: "Hội thoại",
        progress: progresData?.conversation?.done || 0,
        total: progresData?.conversation?.total || 0,
        greeting: "Luyện nói thôi!",
        image: Bear3,
        onClick: () => router.push("/speaking"),
      },
    ],
    [progresData]
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            `${context.parsed.y ?? context.parsed ?? context.raw} điểm`,
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        type: "category",
        grid: {
          color: "#B2DEE0",
        },
        ticks: {
          color: "white",
          font: {
            family: "Quicksand",
            size: 12,
          },
          padding: 12,
        },
        border: { display: false },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        min: 0,
        max: 10,
        display: false,
      },
    },
  };

  return (
    <div className="learning-progress">
      <div>
        <h1 className="h1-title">📊 Kết quả học</h1>
        <div className="learning-progress-wrapper">
          {learningProgressData.map((item, index) => (
            <ProgressCard item={item} key={index} />
          ))}
        </div>
      </div>
      <>
        <h1 className="h1-title">⏰ Thời gian học</h1>
        <div
          className="learning-progress-chart"
          style={{ position: "relative", height: "400px" }}
        >
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </>
    </div>
  );
}

export default LearningProgress;
