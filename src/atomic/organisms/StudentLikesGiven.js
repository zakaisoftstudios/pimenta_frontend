import React from 'react'
import styled from 'styled-components'
import Loader from '../atoms/Loader'
import ItalicText from '../atoms/ItalicText'
import JobOffer from '../molecules/JobOffer'
import StudentLikesGivenActions from '../molecules/StudentLikesGivenActions'

const StudentLikesGiven = ({
  likes,
  loading,
  handleShowJobOffer,
  handleRemoveJobLike,
  handleJobLikeAction
}) =>
  loading ? (
    <Loader />
  ) : (
    <Wrapper>
      {likes.length > 0 ? (
        likes.map(like => {
          return (
            <JobOffer
              key={like.id}
              jobOffer={like.job_offer}
              handleClick={handleShowJobOffer(like.job_offer)}
              likeMatchPercentage={like.match_percentage}
              actions={
                <StudentLikesGivenActions
                  jobLikeStatus={like.job_like_status}
                  handleJobLikeAction={handleJobLikeAction(like)}
                  handleRemoveJobLike={handleRemoveJobLike(like)}
                />
              }
            />
          )
        })
      ) : (
        <ItalicText>no liked jobs yet</ItalicText>
      )}
    </Wrapper>
  )

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

export default StudentLikesGiven
