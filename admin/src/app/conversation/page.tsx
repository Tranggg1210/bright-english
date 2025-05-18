import MainLayout from "@src/components/layouts/main-layout";
import ConversationManagement from "@src/components/templates/_conversation";

function page() {
  return <MainLayout main={<ConversationManagement />} />;
}

export default page
