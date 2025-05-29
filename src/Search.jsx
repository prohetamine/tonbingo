import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 400px;
  padding: 20px;
  font-size: 20px;
`

const Search = () => {
  const [address, setAddress] = useState('')

  return (
    <Body>
      <form action={`/address/${address}`}>
        <Input value={address} onChange={({ target: { value } }) => setAddress(value)} />
      </form>
    </Body>
  )
}

export default Search