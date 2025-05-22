import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import Flashcard from '@src/components/templates/_flashcard'

function Page() {
  return <MainLayout main={<Flashcard/>}/>
}

export default Page
