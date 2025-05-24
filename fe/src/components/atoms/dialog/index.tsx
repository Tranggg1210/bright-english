import "./style.scss";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import ButtonComponent from "../button";
import { DialogProps } from "@src/types/interface";

const DialogComponent = ({
  show,
  setIsOpen,
  image,
  title,
  description,
  textButtonLeft,
  textButtonRight,
  colorButtonLeft,
  colorButtonRight,
  handleCloseModal,
  handleButtonRight,
  bgRight,
  bgLeft,
  isLoading,
  className,
  isDisableCloseModalInOverlay,
  classNameBtnLeft,
  classNameBtnRight,
  classNameInContentBtn,
  sizeImage = 100,
}: DialogProps) => {
  return show ? (
    <Modal
      show={show}
      onHide={isDisableCloseModalInOverlay ? () => {} : () => setIsOpen(false)}
      centered
      backdrop={isDisableCloseModalInOverlay ? "static" : true}
      className={className}
      dialogClassName="dialog-component"
    >
      <Modal.Body className="p-4 text-center">
        <div className="modal-image mb-2">
          <Image
            src={image}
            alt="modal-img"
            width={sizeImage}
            height={sizeImage}
          />
        </div>

        <div
          className="modal__title mt-2 font-bold"
          dangerouslySetInnerHTML={{ __html: title }}
        ></div>

        {description && (
          <div
            className="modal__description mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}

        <div className="w-full flex gap-3 items-center justify-center mt-4 flex-wrap">
          {textButtonLeft && bgLeft && handleCloseModal && colorButtonLeft && (
            <ButtonComponent
              title={textButtonLeft}
              borderRadius="48px"
              padding="12px 16px"
              width="137px"
              background={bgLeft}
              onClick={handleCloseModal}
              fontSize="16px"
              color={colorButtonLeft}
              className={classNameBtnLeft}
              classNameInContent={classNameInContentBtn}
            />
          )}
          <ButtonComponent
            title={textButtonRight}
            borderRadius="48px"
            padding="12px 16px"
            width={
              textButtonLeft && bgLeft && handleCloseModal && colorButtonLeft
                ? "137px"
                : "40%"
            }
            background={bgRight}
            onClick={handleButtonRight}
            fontSize="16px"
            color={colorButtonRight}
            isLoading={isLoading}
            className={classNameBtnRight}
            classNameInContent={classNameInContentBtn}
          />
        </div>
      </Modal.Body>
    </Modal>
  ) : (
    <></>
  );
};

export default DialogComponent;
