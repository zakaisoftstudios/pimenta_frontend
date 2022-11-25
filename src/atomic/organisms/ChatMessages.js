import React from 'react'
import styled from 'styled-components'
import ChatConversationHeading from '../molecules/ChatConversationHeading'
import { ActionCable } from 'react-actioncable-provider'
import ChatBubble from '../molecules/ChatBubble'
import ChatInput from '../molecules/ChatInput'
import ReturnButton from '../molecules/ReturnButton'
import { breakpoints } from '../../constants/responsive'
import Loader from '../atoms/Loader'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const ChatMessages = ({
  conversation,
  loadingMessages,
  newMessage,
  handleTypeMessage,
  handleSendMessage,
  handleReceiveMessage,
  handleChatBottomRef,
  handleReturn,
  handleShowPartnerProfile,
  i18n
}) => {
  if (loadingMessages)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )

  return (
    conversation && (
      <Wrapper>
        <StyledReturnButton
          mainAction={{ text: i18n._(t`Return`), handler: handleReturn }}
        />
        <ChatConversationHeading
          name={conversation.partner_name}
          picture={conversation.partner_pic}
          description={conversation.partner_description}
          big
          showTrash={false}
          handleShowPartnerProfile={handleShowPartnerProfile(
            conversation.partner_profile
          )}
        />

        <Messages>
          <OverflowWrapper>
            {conversation.messages.map(
              ({ content, created_at, sender_user_id }, i) => (
                <ChatBubble
                  key={i}
                  content={content}
                  time={created_at}
                  fromMe={conversation.owner_user_id === sender_user_id}
                />
              )
            )}

            <div ref={handleChatBottomRef} />
          </OverflowWrapper>
        </Messages>

        <ChatInput
          newMessage={newMessage}
          handleTypeMessage={handleTypeMessage}
          handleSendMessage={handleSendMessage}
        />

        <ActionCable
          channel={{
            channel: 'ChatMessagesChannel',
            conversation_id: conversation.id
          }}
          onReceived={handleReceiveMessage}
        />
      </Wrapper>
    )
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2.4rem;
  padding-top: 5rem;
  flex: 1;
  height: calc(100vh - 8.1rem);

  @media (min-width: ${breakpoints.sm}) {
    height: auto;
  }
`

const Messages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-top: 1px solid #c4c4c4;
  margin-top: 2.4rem;
  padding-right: 1.2rem;
  overflow-y: auto;
`

const StyledReturnButton = styled(ReturnButton)`
  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
`

const OverflowWrapper = styled.div`
  height: 395px;
`

const BottomRef = styled.div``

export default withI18n()(ChatMessages)
