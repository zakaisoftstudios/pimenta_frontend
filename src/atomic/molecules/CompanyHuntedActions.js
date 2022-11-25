import React from 'react'
import styled from 'styled-components'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import trashIcon from '../../assets/icons/trash.svg'
import huntStatuses from '../../constants/huntStatuses'
import { CardActionIcon } from './Icon'
import { ActionsWrapper } from '../atoms/Card'

const CompanyHuntedActions = ({
  handleRemoveHunt,
  huntStatus,
  handleGoToChat,
  className
}) => (
  <ActionsWrapper className={className}>
    {huntStatus === huntStatuses.MATCHED && (
      <CardActionIcon src={chatBubbleIcon} handleClick={handleGoToChat} />
    )}

    <CardActionIcon src={trashIcon} handleClick={handleRemoveHunt} bottom />
  </ActionsWrapper>
)

export default CompanyHuntedActions
