/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { useParams } from 'react-router-dom'
import CanvasImage from './CanvasImage.jsx'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useScan from './use-scan.jsx'

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
`

const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`

const PathOverflow = styled.div`
  padding: 20px;
  padding-bottom: 0px;
`

const ChunkWarning = styled.span`
  color: red;
`

const Content = () => {
  const { address, type: _type, id: _id } = useParams()
      , images = useScan(address)

  const image = images?.filter(image => `${image.id}` === _id)[0]

  return (
    <Body>
      <PathOverflow>
        <Link to={`/address/${address}`}>{address}</Link> <span>/</span> <Link to={`/address/${address}/${_type}/${_id}`}>{_id}</Link> ({Object.keys(image?.chunks || {}).length}/{(image?.max?.y * image?.max?.x) || 0})
      </PathOverflow>
      {
        (Object.keys(image?.chunks || {}).length !== 0) && Object.keys(image?.chunks || {}).length !== (image?.max?.y * image?.max?.x) 
          ? (
            <PathOverflow>
              <ChunkWarning>Полните кошелек <u><b>{address}</b></u> на <b>{image?.chunkAmount} TON</b> чтобы открыть очередной кусок в комментарии укажите "{_id}" (Без кавычек)</ChunkWarning>
            </PathOverflow>
          ) : null
      }
      <Items>
        {
          image 
            ? (
              <div>
                <CanvasImage srcData={image} size={`${(window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight) - 240}px`} />
                <div>{image.title}</div>
                <div>{image.description}</div>
              </div>
            )
            : (
              null
            )
        }
      </Items>
    </Body>
  )
}

export default Content