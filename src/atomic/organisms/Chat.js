import React from 'react'
import styled from 'styled-components'
import Loader from '../atoms/Loader'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import { breakpoints } from '../../constants/responsive'
import roundChatIcon from '../../assets/icons/round-chat.svg'
import { Trans } from '@lingui/macro'

const Chat = ({
  loading,
  loadingMessages,
  activeConversation,
  conversationsComponent,
  activeConversationMessagesComponent,
  hasConversations
}) =>
  loading ? (
    <Loader />
  ) : (
    <StyledSectionBox hasActiveConversation={!!activeConversation}>
      <Content>
        <ConversationList
          hide={activeConversation || loadingMessages}
          hasConversations={hasConversations}
        >
          <Heading>
            <Trans>Messages</Trans>
          </Heading>
          {hasConversations ? (
            conversationsComponent
          ) : (
            <IntroWrapper>
              <IntroContent>
                <img src={roundChatIcon} alt="Chat" />

                <IntroText>
                  <Trans>
                    You have no messages! <br />
                    Connect with a professional <br /> to start to chat.
                  </Trans>
                </IntroText>
              </IntroContent>
            </IntroWrapper>
          )}
        </ConversationList>
        {activeConversationMessagesComponent}
      </Content>
    </StyledSectionBox>
  )

const StyledSectionBox = styled(SectionBox)`
  padding: ${props => (props.hasActiveConversation ? '0' : '2.4rem')};
  @media (min-width: ${breakpoints.sm}) {
    padding: 2.4rem 0 0 2.4rem;
  }
`

const ConversationList = styled.span`
  width: 100%;
  display: ${({ hide }) => (hide ? 'none' : 'flex')}
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    width: ${props => (props.hasConversations ? 'auto' : '100%')};
    display: flex;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2.4rem;
`

const IntroWrapper = styled.div`
  display: flex;
  display: ${({ showForm }) => showForm && 'none'};
  justify-content: center;
  align-items: center;
  flex: 1;
`

const IntroContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
`

const IntroText = styled.span`
  font-size: 20px;
  color: rgba(1, 197, 229, 0.846178);
  position: absolute;
  text-align: center;
  top: 79%;
  left: auto;
`

export default Chat
