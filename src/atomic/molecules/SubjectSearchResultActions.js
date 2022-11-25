import React from 'react'
import styled from 'styled-components'
import heartBlankIcon from '../../assets/icons/heart-blank.svg'
import heartRedIcon from '../../assets/icons/heart-red.svg'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import jobLikeStatuses from '../../constants/jobLikeStatuses'
import { CardActionIcon } from './Icon'
import { ActionsWrapper } from '../atoms/Card'

const SubjectSearchResultActions = ({
  handleSubjectLikeAction,
  subjectLike,
  className
}) => (
  <ActionsWrapper className={className}>
    <CardActionIcon
      src={getActionIcon(subjectLike)}
      handleClick={handleSubjectLikeAction}
    />
  </ActionsWrapper>
)

const getActionIcon = subjectLike =>
  subjectLike ? heartRedIcon : heartBlankIcon

export default SubjectSearchResultActions
