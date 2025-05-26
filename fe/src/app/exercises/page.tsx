import React from 'react'
import MainLayout from '@src/components/layouts/main-layout'
import Exercise from '@src/components/templates/_exercise'

function Page() {
  return <MainLayout main={<Exercise/>}/>
}

export default Page
