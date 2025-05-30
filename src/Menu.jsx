/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import CanvasImage from './CanvasImage.jsx'
import useScan from './use-scan.jsx'

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
`

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`

const PathOverflow = styled.div`
  padding: 20px;
  padding-bottom: 0px;
`

const Menu = () => {
  const { address } = useParams()
      , images = useScan(address)

  return (
    <Body>
      <PathOverflow>
        <Link to={`/address/${address}`}>{address}</Link>
      </PathOverflow>
      <Items>
        {
          images?.map((image, key) => {
            return (              
              <Link key={key} to={`/address/${address}/${image.type}/${image.id}`}>
                <CanvasImage srcData={image} size={'100px'} />
                <div>{image.title}</div>
              </Link>
            )
          })
        }
      </Items>
    </Body>
  )
}

export default Menu