import React from 'react'
import styled from 'styled-components'
import Loader from '../atoms/Loader'
import ItalicText from '../atoms/ItalicText'
import StudentSubjectLikesActions from '../molecules/StudentSubjectLikesActions'
import SubjectOffer from '../molecules/SubjectOffer'
import { Trans } from '@lingui/macro'

const StudentSubjectLikes = ({
  subjectLikes,
  loading,
  handleShowSubjectOffer,
  handleRemoveSubjectLike
}) =>
  loading ? (
    <Loader />
  ) : (
    <Wrapper>
      {subjectLikes.length > 0 ? (
        subjectLikes.map(subjectLike => {
          return (
            <SubjectOffer
              key={subjectLike.id}
              subjectOffer={subjectLike.subject_offer}
              handleClick={handleShowSubjectOffer(subjectLike.subject_offer)}
              likeMatchPercentage={subjectLike.match_percentage}
              actions={
                <StudentSubjectLikesActions
                  handleRemoveSubjectLike={handleRemoveSubjectLike(subjectLike)}
                />
              }
            />
          )
        })
      ) : (
        <ItalicText>
          <Trans>no liked subjects yet</Trans>
        </ItalicText>
      )}
    </Wrapper>
  )

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

export default StudentSubjectLikes
