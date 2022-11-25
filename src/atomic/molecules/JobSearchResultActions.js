import React from 'react'
import styled from 'styled-components'
import heartBlankIcon from '../../assets/icons/heart-blank.svg'
import heartRedIcon from '../../assets/icons/heart-red.svg'
import chatBubbleIcon from '../../assets/icons/chat-bubble.svg'
import jobLikeStatuses from '../../constants/jobLikeStatuses'
import { CardActionIcon } from './Icon'

const JobSearchResultActions = ({
  handleJobLikeAction,
  jobLikeStatus,
  className
}) => (
  <Wrapper className={className}>
    <CardActionIcon
      src={getActionIcon(jobLikeStatus)}
      handleClick={handleJobLikeAction}
    />
  </Wrapper>
)

const getActionIcon = jobLikeStatus => {
  switch (jobLikeStatus) {
    case jobLikeStatuses.MATCHED_FROM_HUNT:
      return chatBubbleIcon
    case jobLikeStatuses.MATCHED:
      return chatBubbleIcon
    case jobLikeStatuses.STUDENT_LIKED:
      return heartRedIcon
    case jobLikeStatuses.NONE:
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

export default JobSearchResultActions
