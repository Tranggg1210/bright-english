'use client';
import MainLayout from "@src/components/layouts/main-layout";
import GrammarAction from "@src/components/templates/_grammar/actions";

function page() {
  return <MainLayout main={<GrammarAction />} />;
}

export default page
