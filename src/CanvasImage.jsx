/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import question from './assets/question.png'

const Canvas = styled.canvas`
  background-image: url(${question});
  background-size: cover;
`

const CanvasImage = ({ srcData, size }) => {
  const canvasNode = useRef()

  useEffect(() => {
    const node = canvasNode.current

    if (node) {
      const ctx = node.getContext('2d')

      Array(srcData.max.x).fill(true).map((_, x) => 
        Array(srcData.max.y).fill(true).map((_, y) => {
          const data = srcData.chunks[`${x}:${y}x${srcData.max.x}:${srcData.max.y}`]?.data
          const id = `${srcData.id}.${x}:${y}x${srcData.max.x}:${srcData.max.y}`
          
          if (!window.img) {
             window.img = {}
          }
         
          window.img[id] = new window.Image()
          if (window.img[id]) {
            const offset = node.width / srcData.max.x
            ctx.drawImage(window.img[id], x * offset, y * offset, offset, offset)
          } else {
            window.img[id].onload = () => {
              const offset = node.width / srcData.max.x
              ctx.drawImage(window.img[id], x * offset, y * offset, offset, offset)
            }
            window.img[id].src = data 
          }
        })
      )

      return () => {
        ctx.fillStyle = '#444'
        ctx.fillRect(0, 0, 0, 0)
      }
    }
  }, [canvasNode.current, srcData, Object.keys(srcData.chunks).length])

  return (
    <Canvas width={size} height={size} ref={canvasNode}></Canvas>
  )
}

export default CanvasImage