import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import DetailExerise from '@src/components/templates/_detail-exercise'

function Page() {
  return <MainLayout main={<DetailExerise/>}/>
}

export default Page
