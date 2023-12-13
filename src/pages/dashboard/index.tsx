import React from 'react'
import NavBar from '../../components/navbar'
import Card from '../../components/card'
import { Separator } from '../../components/ui/separator'
import ImageInput from '../../components/imageInput'
import ImageAnalysis from '../../components/categorizeData'

const Dashboard = () => {
  return (
    <>
      <NavBar />

      <div className='container flex justify-around my-9'>
        <Card />
        <Card />
        <Card />
      </div>
      <ImageAnalysis />
      <Separator />


    </>
  )
}

export default Dashboard