import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import StudyFlashcard from '@src/components/templates/_study-flashcard'

function Page() {
  return <MainLayout main={<StudyFlashcard/>}/>
}

export default Page
