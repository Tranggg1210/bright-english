import MainLayout from "@src/components/layouts/main-layout";
import TopicManagement from '@src/components/templates/_topic';


function Page() {
  return  <MainLayout main={<TopicManagement />} />
}

export default Page
