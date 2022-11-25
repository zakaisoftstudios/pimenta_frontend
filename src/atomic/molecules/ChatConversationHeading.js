import React from 'react'
import styled from 'styled-components'
import ProfilePic from '../atoms/ProfilePic'
import { profilePicTypes } from '../../constants/componentTypes'
import trashIcon from '../../assets/icons/trash.svg'

const ChatConversationHeading = ({
  picture,
  name,
  description,
  big,
  handleRemoveConversation,
  handleOpenConversation,
  handleShowPartnerProfile,
  showTrash = true
}) => (
  <Wrapper>
    <Content
      onClick={handleShowPartnerProfile || handleOpenConversation}
      clickable={true}
    >
      <ProfilePic profilePic={picture} type={profilePicTypes.MEDIUM} />

      <Info>
        <Name big={big}>{name}</Name>
        <Description>{description}</Description>
      </Info>
    </Content>

    {showTrash && (
      <Actions>
        <TrashIcon src={trashIcon} onClick={handleRemoveConversation} />
      </Actions>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.2rem;
`

const Name = styled.div`
  font-weight: ${({ big }) => (big ? '500' : '300')};
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  color: #000000;
  margin-bottom: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ big }) => (big ? '100%' : '15rem')};
`

const Description = styled.div`
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ big }) => (big ? '100%' : '15rem')};
`

const TrashIcon = styled.img`
  width: 1.8rem;
  height: 1.9rem;
  cursor: pointer;
  margin-top: auto;
`

const Actions = styled.div`
  margin-left: 1.5rem;
  align-self: flex-end;
`

export default ChatConversationHeading
