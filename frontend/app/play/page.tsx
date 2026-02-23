'use client'
import ChessBoard from '@/components/play-page/ChessBoard'
import React from 'react'

const Play = () => {
  return (
    <div className='w-screen h-screen'>
        <div className='w-full h-full flex items-center justify-center'>
            <ChessBoard />
        </div>
    </div>
  )
}

export default Play