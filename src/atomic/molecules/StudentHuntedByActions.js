import React from 'react'
import styled from 'styled-components'
import heartBlankIcon from '../../assets/icons/heart-blank.svg'
import heartRedIcon from '../../assets/icons/heart-red.svg'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import trashIcon from '../../assets/icons/trash.svg'
import huntStatuses from '../../constants/huntStatuses'
import { CardActionIcon } from './Icon'
import { ActionsWrapper } from '../atoms/Card'

const StudentHuntedByActions = ({
  handleLikeAction,
  huntStatus,
  handleRemoveHunt,
  className
}) => (
  <ActionsWrapper className={className}>
    <CardActionIcon
      src={getActionIcon(huntStatus)}
      handleClick={handleLikeAction}
    />

    <CardActionIcon
      src={trashIcon}
      handleClick={handleRemoveHunt}
      bottom
      noMarginBottom
    />
  </ActionsWrapper>
)

const getActionIcon = huntStatus => {
  switch (huntStatus) {
    case huntStatuses.MATCHED:
      return chatBubbleIcon
    case huntStatuses.HUNTED:
      return heartBlankIcon
    default:
      return heartBlankIcon
  }
}

export default StudentHuntedByActions
