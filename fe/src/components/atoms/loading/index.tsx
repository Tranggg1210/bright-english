import "./style.scss";

function Loading({ isOverlayTransparent = false }) {
  return (
    <div
      className={`loading-overlay ${
        isOverlayTransparent ? "loadind-overlay-transparent" : ""
      }`}
    >
      <div className="loading-ring"></div>
    </div>
  );
}

export default Loading;
