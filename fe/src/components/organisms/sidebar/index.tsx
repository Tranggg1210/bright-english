"use client";

import "./style.scss";
import {
  ArrowLeft,
  ArrowRight,
  BookIcon,
  ChartIcon,
  FAQIcon,
  InforIcon,
  SupportIcon,
} from "@src/components/svgs";
import Image from "next/image";
import logo from "@public/images/logo.png";
import logoMobile from "@public/images/logo-mobile.png";
import TruncateText from "@src/components/atoms/sidebar/truncate-text";
import ButtonComponent from "@src/components/atoms/button";
import NavCard from "@src/components/atoms/sidebar/nav-item";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { setIsFullSidebar } from "@src/services/sidebar";
import useWindowSize from "@src/hooks/useWindowSize";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type NavItemType = {
  children_id: string;
  icon: React.ReactNode;
  title: string;
  to: string;
};

type NavGroupType = {
  id: number;
  title: string;
  classStyle: string;
  childrens: NavItemType[];
};

const navData: NavGroupType[] = [
  {
    id: 1,
    title: "Chức năng",
    classStyle: "nav-features",
    childrens: [
      {
        children_id: "a1",
        icon: BookIcon,
        title: "Trang chủ",
        to: "/app",
      },
      {
        children_id: "a2",
        icon: ChartIcon,
        title: "Tiến trình học tập",
        to: "/progress",
      },
    ],
  },
  {
    id: 2,
    title: "Tìm hiểu thêm",
    classStyle: "nav-learn-about",
    childrens: [
      {
        children_id: "b1",
        icon: InforIcon,
        title: "Giới thiệu",
        to: "/introduction",
      },
      {
        children_id: "b2",
        icon: FAQIcon,
        title: "FAQ",
        to: "/faq",
      },
      {
        children_id: "b3",
        icon: SupportIcon,
        title: "Hỗ trợ",
        to: "/support",
      },
    ],
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isFullSidebar } = useAppSelector((state) => state.sidebar);
  const { width } = useWindowSize();
  const router = useRouter();
  const handleEnLarge = () => {
    dispatch(setIsFullSidebar(!isFullSidebar));
  };

  useEffect(() => {
    dispatch(setIsFullSidebar(width >= 1024));
  }, [width]);

  return (
    <>
      <div
        className={`sidebar ${
          !isFullSidebar ? "sidebar-shrink" : "sidebar-enlarge"
        }`}
      >
        <div className="sidebar-logo">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            {isFullSidebar ? (
              <Image src={logo} alt="logo" width={150} height={40} />
            ) : (
              <Image src={logoMobile} alt="logo" width={32} height={32} />
            )}
          </div>

          <ButtonComponent
            onClick={handleEnLarge}
            className={`${!isFullSidebar ? "btn-shrink" : ""} cursor-pointer`}
            icon={isFullSidebar ? ArrowLeft : ArrowRight}
            background=""
            borderRadius=""
            color=""
            fontSize=""
            padding=""
            title=""
            classNameInIcon="!mr-0"
          />
        </div>

        <div className="sidebar-nav">
          {navData.map((nav) => (
            <div className={nav.classStyle} key={nav.id}>
              <TruncateText
                text={nav.title}
                maxLength={isFullSidebar ? 100 : 9}
                classStyle="nav-title"
              />
              <div className="nav-router">
                {nav.childrens.map((item) => (
                  <NavCard
                    key={item.children_id}
                    icon={item.icon}
                    title={item.title}
                    to={item.to}
                    enlarge={isFullSidebar}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-mobile">
        <div className="sidebar-nav">
          {navData.map((nav) => (
            <div className={nav.classStyle} key={nav.id}>
              <div className="nav-router">
                {nav.childrens.map((item) => (
                  <NavCard
                    key={item.children_id}
                    icon={item.icon}
                    title={item.title}
                    to={item.to}
                    enlarge={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
