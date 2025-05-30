/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import CanvasImage from './CanvasImage.jsx'

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
      , [lastTransactionLt, setLastTransactionLt] = useState(null)
      , [isFirstLoadAction, setFirstLoadAction] = useState(false)
      , [images, setImages] = useState([])

  useEffect(() => {
    const timeId = setTimeout(async () => {
      try {
        const { accounts } = await fetch(`https://toncenter.com/api/v3/accountStates?address=${address}&include_boc=false`).then(data => data.json())
        setLastTransactionLt(accounts[0]?.last_transaction_lt)
      } catch (e) {}
    }, 100)

    const intervalId = setInterval(async () => {
      try {
        const { accounts } = await fetch(`https://toncenter.com/api/v3/accountStates?address=${address}&include_boc=false`).then(data => data.json())
        setLastTransactionLt(accounts[0]?.last_transaction_lt)
      } catch (e) {}
    }, 60000 * 5)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeId)
    }
  }, [address])

  useEffect(() => {
    const IntervalId = setInterval(async () => {
      setFirstLoadAction(true)
      
      try {
        const data = await fetch(`https://toncenter.com/api/v3/actions?account=${address}&limit=${1000}${lastTransactionLt ? `&end_lt=${lastTransactionLt}` : ``}&sort=desc&supported_action_types[]=multisig_create_order&supported_action_types[]=multisig_approve&supported_action_types[]=multisig_execute&supported_action_types[]=jvault_stake&supported_action_types[]=jvault_claim&supported_action_types[]=vesting_send_message&supported_action_types[]=vesting_add_whitelist&supported_action_types[]=evaa_supply&supported_action_types[]=evaa_withdraw`).then(data => data.json())
        if (data?.actions?.length) {
          setLastTransactionLt(data.actions[data?.actions?.length - 1]?.end_lt)
        }
      
        data.actions
          //?.filter(action => action.type === 'ton_transfer')
          ?.map(action => action?.details?.comment?.split('@'))
          ?.filter(data => data)
          ?.map(([app, id, title, description, type, nsfw, chunkAmount, position, data, isOk]) => {
            console.log(app, id, title, description, type, nsfw, chunkAmount, position, data, isOk)
            try {
              if (
                chunkAmount - 0 === parseFloat(parseFloat(chunkAmount).toFixed(2)) &&
                isOk === 'ok' &&
                app === 'tonbingo3' && 
                id.length === 4 && 
                title.length > 0 && 
                title.length < 51 && 
                description.length > 0 && 
                description.length < 200 && 
                (type === 'i') && 
                (nsfw === 'y' || nsfw === 'n') && 
                position.match(/\d+:\d+x\d+:\d+/) && 
                data.match(/data:/)
              ) {
                if (!window.data) {
                  window.data = {}
                }

                if (!window.data[address]) {
                  window.data[address] = {}
                }

                const [_x, _y, _mx, _my] = position.split('x').map(c => c.split(':')).flat()

                const x = parseInt(_x)
                    , y = parseInt(_y)
                    , mx = parseInt(_mx)
                    , my = parseInt(_my)

                if (!window.data[address][id]) {
                  window.data[address][id] = {
                    id,
                    title,
                    type, 
                    nsfw,
                    chunkAmount,
                    description,
                    max: { 
                      x: mx,
                      y: my
                    },
                    chunks: {}
                  }
                } 
                
                window.data[address][id].chunks[position] = {
                  x, 
                  y,
                  data
                }

                const _images = Object.keys(window.data[address]).map(id => window.data[address][id])

                if (images.length !== _images.length) {
                  setImages(_images)
                }
              }
            } catch (e) {}
          })
      } catch (e) {}
    }, isFirstLoadAction ? 5000 : 100)

    return () => {
      clearInterval(IntervalId)
    }
  }, [lastTransactionLt, isFirstLoadAction, address, images])

  return (
    <Body>
      <PathOverflow>
        <Link to={`/address/${address}`}>{address}</Link>
      </PathOverflow>
      <Items>
        {
          images.map((image, key) => {
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