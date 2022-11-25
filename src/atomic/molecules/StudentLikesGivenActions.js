import React from 'react'
import styled from 'styled-components'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import trashIcon from '../../assets/icons/trash.svg'
import { CardActionIcon } from './Icon'
import jobLikeStatuses from '../../constants/jobLikeStatuses'

const StudentLikesGivenActions = ({
  jobLikeStatus,
  handleJobLikeAction,
  handleRemoveJobLike,
  className
}) => (
  <Wrapper className={className}>
    {(jobLikeStatus === jobLikeStatuses.MATCHED ||
      jobLikeStatus === jobLikeStatuses.MATCHED_FROM_HUNT) && (
      <CardActionIcon src={chatBubbleIcon} handleClick={handleJobLikeAction} />
    )}

    <CardActionIcon src={trashIcon} handleClick={handleRemoveJobLike} bottom />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.2rem;
`

export default StudentLikesGivenActions
