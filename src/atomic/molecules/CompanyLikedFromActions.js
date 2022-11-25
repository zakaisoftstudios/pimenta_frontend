import React from 'react'
import styled from 'styled-components'
import heartBlankIcon from '../../assets/icons/heart-blank.svg'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import trashIcon from '../../assets/icons/trash.svg'
import { CardActionIcon } from './Icon'
import likeStatuses from '../../constants/likeStatuses'

const CompanyLikedFromActions = ({
  likeStatus,
  handleLikeAction,
  handleRemoveLiker,
  className
}) => (
  <Wrapper className={className}>
    <CardActionIcon
      src={getActionIcon(likeStatus)}
      handleClick={handleLikeAction}
    />

    <CardActionIcon
      src={trashIcon}
      handleClick={handleRemoveLiker}
      bottom
      noMarginBottom
    />
  </Wrapper>
)

const getActionIcon = likeStatus => {
  switch (likeStatus) {
    case likeStatuses.MATCHED:
      return chatBubbleIcon
    case likeStatuses.MATCHED_FROM_HUNT:
      return chatBubbleIcon
    case likeStatuses.STUDENT_LIKED:
      return heartBlankIcon
    default:
      return heartBlankIcon
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.2rem;
`

export default CompanyLikedFromActions
