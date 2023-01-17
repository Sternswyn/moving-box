import React from 'react'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Container() {
  const [boxPosition, setBoxPosition] = useState({x: 0, y: 0});
  const [index, setIndex] = useState(0)

  const refElementOne = useRef();
  const refElementTwo = useRef();
  const refElementThree = useRef();
  let elementsArray = [];

  const router = useRouter()
  useEffect(() => {
    elementsArray = [
      refElementOne.current.offsetLeft,
      refElementTwo.current.offsetLeft, 
      refElementThree.current.offsetLeft
    ]

    changePosition()
  }, [router.isReady])

  
  function changePosition() {
    let coordinateX = elementsArray[index];
    
    setIndex(prevIndex => prevIndex + 1)

    setBoxPosition(prevPosition => {
      return {
        ...prevPosition,
        x: coordinateX,
      }
    })

  }

  return (
    <div className='container'>
      <Box 
        style={{
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`
        }}
        sx={{
          width: '150px',
          height: '150px',
          margin: '40px 0',
          backgroundColor: 'blue',
          position: 'absolute',
          transition: '.5s ease',
          borderRadius: '10px',
          zIndex: 10
        }} 
      />
      
      <div className='area1'>
        <h1 ref={refElementOne}>Element one</h1>
      </div>
      <div className='area2'>
        <h1 ref={refElementTwo}>Element two</h1>
      </div>
      <div className='area3'>
        <h1 ref={refElementThree}>Element three</h1>
      </div>

      <Button
        variant='contained'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-84px'
        }}
        onClick={changePosition}
      >Change position</Button>
    </div>
  )
  

  
}
