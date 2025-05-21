import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import Home from '@src/components/templates/_home'

function Page() {
  return <MainLayout main={<Home/>}/>
}

export default Page
