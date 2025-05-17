import MainLayout from "@src/components/layouts/main-layout";
import Contact from '@src/components/templates/_contact';

function page() {
  return <MainLayout main={<Contact />} />;
}

export default page
