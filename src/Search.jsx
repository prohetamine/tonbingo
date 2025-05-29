import { useState } from 'react'
import styled from 'styled-components'
import { Form } from 'react-router-dom'

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
      <Form action={`/address/${address}`}>
        <Input value={address} placeholder='Address' onChange={({ target: { value } }) => setAddress(value)} />
      </Form>
    </Body>
  )
}

export default Search