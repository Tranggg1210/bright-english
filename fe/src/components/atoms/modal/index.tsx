import "./style.scss";
import { Modal } from "react-bootstrap";
import { ModalComponentProps } from "@src/types/interface";

function ModalComponent({
  isShow,
  setIsShow,
  titleModal,
  children,
  borderRadius = 24,
  bgOverlay,
  isDisableCloseAtOverlay,
  classNameModal = "",
  classNameTitle = "",
  classNameContentContainer = "",
  classNameHeader = "",
  dialogClassName = "",
}: ModalComponentProps) {
  return (
    <Modal
      show={isShow}
      onHide={() => {
        if (!isDisableCloseAtOverlay) {
          setIsShow(false);
        }
      }}
      className={`modal-component__share ${classNameModal}`}
      style={{
        backgroundColor: bgOverlay,
      }}
      centered
      data-ignore-click="true"
      dialogClassName={dialogClassName}
    >
      <Modal.Body
        className={`p-[20px] bg-white ${classNameContentContainer}`}
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      >
        <div
          className={`modal_header ${classNameHeader}`}
        >
          <h3
            className={`h1-title title-modal ${classNameTitle}`}
            dangerouslySetInnerHTML={{ __html: titleModal }}
          ></h3>
          <button onClick={() => setIsShow(false)} aria-label="Đóng">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="16" fill="#C4C4CF" />
              <path
                d="M20.6668 11.334L11.3335 20.6673M11.3335 11.334L20.6668 20.6673"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
