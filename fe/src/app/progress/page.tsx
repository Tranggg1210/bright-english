import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import LearningProgress from '@src/components/templates/_progress'

function Page() {
  return <MainLayout main={<LearningProgress/>}/>
}

export default Page
