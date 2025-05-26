import { usePathname } from "next/navigation"

const useBreadcrumb = () => {
  const pathname = usePathname();

  if (pathname === "/app") {
    return {
      title: "Trang chủ",
      to: "/app",
    };
  }

  if (pathname === "/introduction") {
    return {
      title: "Giới thiệu",
      to: "/introduction",
    };
  }

  if (pathname === "/support") {
    return {
      title: "Hỗ trợ",
      to: "/support",
    };
  }

  if (pathname === "/faq") {
    return {
      title: "FAQ",
      to: "/faq",
    };
  }

  if (pathname === "/progress") {
    return {
      title: "Tiến trình học tập",
      to: "/progress",
    };
  }

  if (pathname === "/flashcard") {
    return {
      title: "Flashcard",
      to: "/flashcard",
    };
  }

  if (pathname === "/grammar") {
    return {
      title: "Ngữ pháp",
      to: "/grammar",
    };
  }

  if (pathname.includes("/detail-flashcard")) {
    return {
      title: "Chi tiết flashcard",
      to: "/detail-flashcard",
    };
  }

  if (pathname.includes("/exercises") || pathname.includes("/detail-exercise")) {
    return {
      title: "Bài tập",
      to: "/exercises",
    };
  }

  return null;
};


export default useBreadcrumb;
