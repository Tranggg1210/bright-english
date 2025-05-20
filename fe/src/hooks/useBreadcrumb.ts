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

  return null;
};


export default useBreadcrumb;
