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
          const img = new window.Image()
          img.onload = () => {
            const offset = node.width / srcData.max.x
            ctx.drawImage(img, x * offset, y * offset, offset, offset)
          }
          img.src = data
        })
      )

      return () => {
        ctx.clearRect(0, 0, node.width, node.height)
      }
    }
  }, [canvasNode, srcData, Object.keys(srcData.chunks).length])

  return (
    <Canvas width={size} height={size} ref={canvasNode}></Canvas>
  )
}

export default CanvasImage