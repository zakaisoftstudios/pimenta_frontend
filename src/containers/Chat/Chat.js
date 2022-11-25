import React from 'react'
import * as ConversationsAPI from '../../services/api/conversations'
import * as ChatNotificationsAPI from '../../services/api/chatNotifications'
import Chat from '../../atomic/organisms/Chat'
import ChatConversations from '../../atomic/organisms/ChatConversations'
import ChatMessages from '../../atomic/organisms/ChatMessages'
import * as MessagesAPI from '../../services/api/messages'
import { connect } from 'react-redux'
import { profileTypes } from '../../constants/profileTypes'
import ActionModal from '../../atomic/molecules/ActionModal'
import { Trans } from '@lingui/macro'

class ChatContainer extends React.Component {
  state = {
    conversations: [],
    loading: true,
    loadingMessages: false,
    activeConversation: null,
    newMessage: '',
    conversationToRemove: null,
    confirmRemove: false,
    partnerProfileToShow: null
  }

  async componentDidMount() {
    const backendResource = this.getBackendResource()
    const conversations = await ConversationsAPI.getAll(backendResource)

    ChatNotificationsAPI.destroy()
    if (!conversations.error) this.setState({ conversations, loading: false })
  }

  getBackendResource = () => {
    const profileType = this.props.profileType
    return profileTypes[profileType].backendResource
  }

  handleCloseConversation = () => {
    this.setState({ activeConversation: null })
  }

  handleOpenConversation = conversationId => async () => {
    this.setState({ loadingMessages: true })

    const activeConversation = this.state.conversations.find(
      conversation => conversation.id === conversationId
    )

    const backendResource = this.getBackendResource()
    const messages = await MessagesAPI.getAll(conversationId, backendResource)

    this.setState(
      {
        activeConversation: {
          ...activeConversation,
          messages
        },
        loadingMessages: false
      },
      () => this.scrollToChatBottom()
    )
  }

  handleTypeMessage = event => {
    this.setState({ newMessage: event.currentTarget.value })
  }

  handleSendMessage = async () => {
    const {
      newMessage,
      activeConversation: { id: conversationId }
    } = this.state

    if (newMessage.length === 0) return

    const message = await MessagesAPI.post(conversationId, newMessage)

    if (!message.error) this.addMessage(message)
  }

  handleReceiveMessage = newMessage => {
    if (
      newMessage.sender_user_id !== this.state.activeConversation.owner_user_id
    )
      this.addMessage(newMessage)
  }

  addMessage = newMessage => {
    const { activeConversation, conversations } = this.state

    const withNewMessage = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage]
    }

    this.setState(
      {
        activeConversation: withNewMessage,
        newMessage: ''
      },
      () => this.scrollToChatBottom('smooth')
    )
  }

  handleRemoveConversation = conversationToRemove => () =>
    this.setState({
      conversationToRemove,
      confirmRemove: true
    })

  handleRemoveConversationCancel = () =>
    this.setState({
      conversationToRemove: null,
      confirmRemove: false
    })

  handleRemoveConvesationConfirm = async () => {
    const { conversationToRemove, conversations } = this.state
    const backendResource = this.getBackendResource()

    this.setState({ confirmRemove: false })

    const res = await ConversationsAPI.destroy(
      conversationToRemove.id,
      backendResource
    )

    const newConversations = conversations.filter(
      conversation => conversation.id !== conversationToRemove.id
    )

    this.setState({ conversations: newConversations })
  }

  handleChatBottomRef = el => (this.chatBottomEl = el)

  scrollToChatBottom = behavior => {
    this.chatBottomEl.scrollIntoView({ behavior })
  }

  handleShowPartnerProfile = partnerProfileToShow => () => {
    this.setState({ partnerProfileToShow })
  }

  handleLeavePartnerProfile = () =>
    this.setState({ partnerProfileToShow: null })

  render() {
    const {
      loading,
      loadingMessages,
      conversations,
      activeConversation,
      newMessage,
      confirmRemove,
      partnerProfileToShow
    } = this.state

    if (partnerProfileToShow) {
      const profileType = this.props.profileType
      const PartnerComponent = profileTypes[profileType].chatPartnerComponent

      return (
        <PartnerComponent
          profile={partnerProfileToShow}
          ready={true}
          canEdit={false}
          handleReturn={this.handleLeavePartnerProfile}
        />
      )
    }

    const conversationsComponent = (
      <ChatConversations
        conversations={conversations}
        handleOpenConversation={this.handleOpenConversation}
        handleRemoveConversation={this.handleRemoveConversation}
      />
    )

    const activeConversationMessagesComponent = (
      <ChatMessages
        conversation={activeConversation}
        loadingMessages={loadingMessages}
        newMessage={newMessage}
        handleTypeMessage={this.handleTypeMessage}
        handleSendMessage={this.handleSendMessage}
        handleReceiveMessage={this.handleReceiveMessage}
        handleChatBottomRef={this.handleChatBottomRef}
        handleReturn={this.handleCloseConversation}
        handleShowPartnerProfile={this.handleShowPartnerProfile}
      />
    )

    return (
      <React.Fragment>
        {confirmRemove && (
          <ActionModal
            handleClose={this.handleRemoveConversationCancel}
            content={
              <div>
                <Trans>
                  Do you want to remove the conversation? The match will be
                  undone and all the likes and hunts between the party will be
                  removed.
                </Trans>
              </div>
            }
            actions={[
              {
                name: <Trans>Confirm</Trans>,
                handler: this.handleRemoveConvesationConfirm
              }
            ]}
          />
        )}

        <Chat
          loading={loading}
          loadingMessages={loadingMessages}
          activeConversation={activeConversation}
          conversationsComponent={conversationsComponent}
          activeConversationMessagesComponent={
            activeConversationMessagesComponent
          }
          hasConversations={conversations.length > 0}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth: { userId, profileType } }) => ({
  userId,
  profileType
})

export default connect(mapStateToProps)(ChatContainer)
