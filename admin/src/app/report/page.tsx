import MainLayout from "@src/components/layouts/main-layout";
import Report from "@src/components/templates/_report";

function page() {
  return <MainLayout main={<Report />} />;
}

export default page
