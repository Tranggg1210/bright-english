import "./style.scss";
import { ButtonProps } from "@src/types/interface";
import { ForwardedRef } from "react";
import Image from "next/image";

const ButtonComponent = ({
  title,
  type = "button",
  fontSize,
  color,
  padding,
  borderRadius,
  background,
  width,
  height,
  onClick,
  icon,
  fontWeight,
  disabled = false,
  className = "",
  classNameInIcon = "",
  classNameInContent = "",
  isLoading = false,
  borderColor = "transparent",
  ref,
  bgLoader,
}: ButtonProps) => {
  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      className={`button-component flex items-center justify-center transition-all ease-linear duration-300 ${className}`}
      onClick={onClick}
      type={type}
      style={{
        fontSize: fontSize,
        color: color,
        padding: padding,
        borderRadius: borderRadius,
        backgroundColor: background,
        width: width,
        height: height,
        fontWeight: fontWeight,
        border: `1px solid ${borderColor}`,
      }}
      disabled={disabled}
    >
      {isLoading ? (
        <span
          className="loader"
          style={{
            width: fontSize,
            height: fontSize,
            borderColor: bgLoader || "#fff",
          }}
        ></span>
      ) : (
        icon && (
          <Image
            src={icon.src || icon}
            alt=""
            className={`icon-button ${classNameInIcon}`}
            width={20}
            height={20}
          />
        )
      )}
      <span
        dangerouslySetInnerHTML={{ __html: title }}
        className={`content-btn ${classNameInContent}`}
        style={{ fontWeight: fontWeight }}
      ></span>
    </button>
  );
};

export default ButtonComponent;
