import React from 'react'
import styled from 'styled-components'
import RouterLink from '../atoms/RouterLink'
import backIcon from '../../assets/icons/back.svg'

const ReturnButton = ({ className, mainAction, extraAction }) => (
  <Wrapper className={className}>
    <MainAction onClick={mainAction.handler}>
      <Button>
        <BackIcon src={backIcon} alt="Back icon" />
        <ButtonText>{mainAction.text}</ButtonText>
      </Button>
    </MainAction>

    {extraAction && (
      <ExtraAction onClick={extraAction.handler}>
        <Button>{extraAction.text}</Button>
      </ExtraAction>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  font-weight: 300;
  margin-bottom: 2.4rem;
  font-size: 12.6304px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
`

const MainAction = styled.div`
  display: flex;
  cursor: pointer;
`

const ExtraAction = styled.div`
  display: flex;
  cursor: pointer;
`

const BackIcon = styled.img`
  width: 0.6rem;
  height: 1.4rem;
  margin-right: 0.6rem;
`

const Button = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #eeeeee;
  }
`

const ButtonText = styled.span`
  padding-top: 0.1rem;
`

export default ReturnButton
