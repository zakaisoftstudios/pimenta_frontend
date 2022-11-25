import React from 'react'
import styled from 'styled-components'
import sendIcon from '../../assets/icons/send.svg'
import { withI18n } from '@lingui/react'
import { t } from '@lingui/macro'

const ChatInput = ({
  newMessage,
  handleTypeMessage,
  handleSendMessage,
  i18n
}) => (
  <Wrapper>
    <InputWrapper>
      <Input
        type="text"
        placeholder={i18n._(t`Write your message`)}
        value={newMessage}
        onChange={handleTypeMessage}
        onKeyPress={e => {
          if (e.key === 'Enter') handleSendMessage()
        }}
      />

      <SendButton
        src={sendIcon}
        alt={i18n._(t`Send message`)}
        onClick={handleSendMessage}
      />
    </InputWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: calc(100% + 2.4rem);
  height: 5.4rem;
  background: #e6e6e6;
  margin-left: -2.4rem;
  padding: 1.4rem 2.4rem;
  align-items: center;
  justify-content: center;
`

const InputWrapper = styled.div`
  height: 3rem;
  flex: 1;
  background: #ffffff;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 1.6rem 1.2rem;
`

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-weight: normal;
  outline: none;
  color: #646464;

  &::placeholder {
    font-style: italic;

    color: #a1a1a1;
  }

  &:focus {
    outline: 0;
  }
`

const SendButton = styled.img`
  width: 1.9rem;
  heigth: 1.9rem;
  cursor: pointer;
  margin-left: 1.2rem;
`

export default withI18n()(ChatInput)
