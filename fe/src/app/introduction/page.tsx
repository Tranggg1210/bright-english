import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import Introduction from '@src/components/templates/_introduction'

function Page() {
  return <MainLayout main={<Introduction/>}/>
}

export default Page
