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

import Bear1 from "@public/images/mascot/bear-ok.png";
import Bear2 from "@public/images/mascot/bear-normal.png";
import Bear3 from "@public/images/mascot/bear-tara.png";
import ProgressCard from "@src/components/atoms/progress/progress-card";
import { useGetProgress } from "@src/hooks/useGetProgress";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@src/hooks/useHookReducers";
import Loading from "@src/components/atoms/loading";

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

function LearningProgress() {
  const chartRef = useRef<ChartJS<"line">>(null);
  const router = useRouter();
  const {progresData, loading}: any = useGetProgress();
  const { dataStudy, isFetching } = useAppSelector((state) => state.users);

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea | null
  ) => {
    if (!chartArea) return;
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

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const values: number[] = [];

    (dataStudy || []).forEach((item) => {
      let label = item.timeText || "N/A";

      if (label !== "Hôm nay") {
        const [day, month] = label.split("/");
        label = `${day}/${month}`;
      }

      labels.push(label);
      values.push(item.timeLearn || 0);
    });

    return {
      labels,
      datasets: [
        {
          data: values,
          label: "Thời gian học",
          borderColor: "#FFC535",
          borderWidth: 1,
          backgroundColor: function (
            context: ScriptableContext<"line">
          ): string | CanvasGradient | undefined {
            const chart = context.chart;
            return getGradient(chart.ctx, chart.chartArea) || undefined;
          },
          fill: true,
        },
      ],
    };
  }, [dataStudy]);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.parsed.y ?? context.raw} phút`,
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: "#B2DEE0" },
        ticks: {
          color: "white",
          font: { family: "Quicksand", size: 12 },
          padding: 12,
        },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 600,
        display: false,
      },
    },
  };

  const learningProgressData = useMemo(
    () => [
      {
        partTitle: "Từ vựng",
        progress: progresData?.vocabulary?.done || 0,
        total: progresData?.vocabulary?.total || 461,
        greeting: "Học từ vựng nào!",
        image: Bear1,
        onClick: () => router.push("/flashcard"),
      },
      {
        partTitle: "Bài tập",
        progress: progresData?.exercise?.done || 0,
        total: progresData?.exercise?.total || 0,
        greeting: "Làm bài tập nhé!",
        image: Bear2,
        onClick: () => router.push("/exercises"),
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

  return (
    <div className="learning-progress">
      {(isFetching || loading) && <Loading/>}
      <h1 className="h1-title">📊 Kết quả học</h1>
      <div className="learning-progress-wrapper">
        {learningProgressData.map((item, index) => (
          <ProgressCard key={index} item={item} />
        ))}
      </div>

      <h1 className="h1-title">⏰ Thời gian học</h1>
      <div
        className="learning-progress-chart"
        style={{ position: "relative", height: "400px" }}
      >
        {chartData?.labels?.length ? (
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        ) : (
          <div className="text-login" onClick={() => router.push('/auth')}>
            Bạn chưa đăng nhập, vui lòng đăng nhập để sử dụng tính năng ^_^
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningProgress;
