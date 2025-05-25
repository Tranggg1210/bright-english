import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import DetailFlashcard from '@src/components/templates/_detail-flashcard'

function Page() {
  return <MainLayout main={<DetailFlashcard/>}/>
}

export default Page
