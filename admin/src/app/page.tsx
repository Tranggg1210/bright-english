import MainLayout from "@src/components/layouts/main-layout";
import UsersManagement from "@src/components/templates/_users";

export default function Home() {
  return <MainLayout main={<UsersManagement />} />;
}
