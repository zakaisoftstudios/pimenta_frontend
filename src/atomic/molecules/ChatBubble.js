import React from 'react'
import styled from 'styled-components'
import { date } from '../../services/locale'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const ChatBubble = ({ content, time, fromMe, i18n }) => (
  <React.Fragment>
    <Wrapper fromMe={fromMe}>
      <Time>{i18n._(t`${date(time)}`)}</Time>
      <Content>{content}</Content>
    </Wrapper>
    <Clear />
  </React.Fragment>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: ${({ fromMe }) =>
    fromMe ? '1px solid #01C0EA' : '1px solid #c4c4c4'};
  width: 20rem;
  min-height: 4.1rem;
  float: ${({ fromMe }) => (fromMe ? 'right' : 'left')};
  color: ${({ fromMe }) => (fromMe ? '#ffff' : '')};
  padding: 0.6rem;
  border-radius: 5px;
  margin-bottom: 1.2rem;
  background: ${({ fromMe }) => (fromMe ? '#01C0EA' : 'none')};
`

const Time = styled.time`
  align-self: flex-end;
  font-style: italic;
  font-weight: 300;

  font-size: 12px;
`

const Content = styled.p`
  padding: 0.6rem;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`

const Clear = styled.div`
  clear: both;
`

export default withI18n()(ChatBubble)
