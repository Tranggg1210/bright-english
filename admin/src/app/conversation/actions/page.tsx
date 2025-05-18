import MainLayout from "@src/components/layouts/main-layout";
import ActionsConversation from "@src/components/templates/_conversation/actions";

function page() {
  return <MainLayout main={<ActionsConversation />} />;
}

export default page
