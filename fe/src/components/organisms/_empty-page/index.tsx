import "./style.scss";
import Image from "next/image";
import NoStudying from "@public/images/no-data.png";
import ButtonComponent from "@src/components/atoms/button";

function EmptyPage({
  image,
  title,
  description,
  showButton,
  classNameOfButton,
  btnTitle = "",
  isNoData,
  handleClick,
  width,
}: {
  image?: string;
  title: string;
  description?: string;
  showButton?: boolean;
  btnTitle?: string;
  isNoData?: boolean;
  classNameOfButton?: string;
  handleClick?: (value?: any) => any;
  width?:string;
}) {
  return (
    <div
      className={`empty-data flex flex-col items-center justify-center  ${
        isNoData ? "!h-max my-11" : ""
      }`}
    >
      {isNoData ? (
        <Image
          src={image || NoStudying}
          alt="empty data image"
          width={200}
          height={200}
        />
      ) : (
        <Image
          src={image || NoStudying}
          alt="empty data image"
          width={200}
          height={200}
        />
      )}
      <h2
        className="mt-4 text-secondarys font-bold text-[16px] leading-4 mb-2 text-center"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      <p
        className="!font-medium text-[14px] leading-[22px] text-secondarys m-0 text-center"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      ></p>
      {showButton && (
        <ButtonComponent
          background="#b3deff7d"
          color="#4267CD"
          fontSize="16px"
          borderRadius="48px"
          onClick={() => handleClick?.()}
          padding="14px 16px"
          title={btnTitle}
          width={width}
          fontWeight={500}
          className={`uppercase mt-6 ${classNameOfButton}`}
        />
      )}
    </div>
  );
}

export default EmptyPage;
