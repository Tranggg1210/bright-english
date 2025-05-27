import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import Conversations from '@src/components/templates/_conversation'

function Page() {
  return <MainLayout main={<Conversations/>}/>
}

export default Page
