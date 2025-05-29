import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Body = styled.div`
  width: 100%;
`

const Navigation = styled.div`
  width: 100%;
  height: 60px;
  background: #333;
  display: flex;
  align-items: center;
  gap: 30px;
`

const Footer = styled.div`
  width: 100%;
  height: 60px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

const Logo = styled.div`
  height: 60px;
  width: 60px;
  background: #fa0;
`

const Template = () => {
  return (
    <Body>
      <Navigation>
        <Logo>Beta App</Logo>
        <Link to='/'>Search</Link>
        <Link to='https://github.com'>GitHub</Link>
      </Navigation>
      <Outlet />
      <Footer>
        TonPic 2025
      </Footer>
    </Body>
  )
}

export default Template