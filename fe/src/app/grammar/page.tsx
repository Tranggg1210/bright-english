import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import Grammar from '@src/components/templates/_grammar'

function Page() {
  return <MainLayout main={<Grammar/>}/>
}

export default Page
