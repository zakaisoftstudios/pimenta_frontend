import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'
import ChatConversationHeading from '../molecules/ChatConversationHeading'
import Card from '../atoms/Card'

const ChatConversations = ({
  conversations,
  handleOpenConversation,
  handleRemoveConversation
}) => (
  <Wrapper>
    {conversations.map(conversation => (
      <ChatConversation key={conversation.id}>
        <ChatConversationHeading
          name={conversation.partner_name}
          picture={conversation.partner_pic}
          description={conversation.partner_description}
          handleRemoveConversation={handleRemoveConversation(conversation)}
          handleOpenConversation={handleOpenConversation(conversation.id)}
        />
      </ChatConversation>
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: none;
  padding-right: 0px;
  height: 100%;
  @media (min-width: ${breakpoints.sm}) {
    border-right: 1px solid #c4c4c4;
    padding-right: 24px;
  }
`

const ChatConversation = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export default ChatConversations
