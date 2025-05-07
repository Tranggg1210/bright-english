import React from 'react'
import MainLayout from "@src/components/layouts/main-layout";
import VocabularyManagement from '@src/components/templates/_vocabulary';

function Page() {
  return <MainLayout main={<VocabularyManagement />} />;
}

export default Page
