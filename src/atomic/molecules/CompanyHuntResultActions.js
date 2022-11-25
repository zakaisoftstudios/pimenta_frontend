import React from 'react'
import styled from 'styled-components'
import heartBlankIcon from '../../assets/icons/heart-blank.svg'
import heartRedIcon from '../../assets/icons/heart-red.svg'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import huntStatuses from '../../constants/huntStatuses'
import { CardActionIcon } from './Icon'

const CompanyHuntResultActions = ({
  handleHuntAction,
  huntStatus,
  className
}) => {
  const actionIcon = getCardActionIcon(huntStatus)

  return (
    <Wrapper className={className}>
      {actionIcon && (
        <CardActionIcon src={actionIcon} handleClick={handleHuntAction} />
      )}
    </Wrapper>
  )
}

const getCardActionIcon = huntStatus => {
  switch (huntStatus) {
    case huntStatuses.MATCHED:
      return chatBubbleIcon
    case huntStatuses.HUNTED:
      return heartRedIcon
    case huntStatuses.NONE:
      return heartBlankIcon
    default:
      return null
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.2rem;
`

export default CompanyHuntResultActions
