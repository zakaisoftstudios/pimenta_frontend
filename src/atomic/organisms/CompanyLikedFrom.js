import React from 'react'
import styled from 'styled-components'
import StudentCard from '../molecules/StudentCard'
import Loader from '../atoms/Loader'
import CompanyLikedFromActions from '../molecules/CompanyLikedFromActions'
import ItalicText from '../atoms/ItalicText'
import { CardDropdown } from '../atoms/Card'
import { Trans } from '@lingui/macro'
import { plural } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const CompanyLikedFrom = ({
  likers,
  loading,
  handleShowStudentProfile,
  trashModal,
  confirmRemove,
  handleRemoveLiker,
  handleLikeAction,
  i18n
}) =>
  loading ? (
    <Loader />
  ) : (
    <Wrapper>
      {likers.length > 0 ? (
        likers.map(liker => (
          <StudentCard
            key={liker.id}
            profile={liker}
            handleShowStudentProfile={handleShowStudentProfile(liker)}
            actions={
              <CompanyLikedFromActions
                likeStatus={liker.like_status}
                handleLikeAction={handleLikeAction(liker)}
                handleRemoveLiker={handleRemoveLiker(liker)}
              />
            }
            dropdown={getLikesDropdown(liker.student_likes, i18n)}
          />
        ))
      ) : (
        <ItalicText>
          <Trans>no one liked you yet</Trans>
        </ItalicText>
      )}

      {confirmRemove && trashModal}
    </Wrapper>
  )

const getLikesDropdown = (student_likes, i18n) => (
  <CardDropdown
    title={i18n._(
      plural({
        value: student_likes.length,
        one: 'Applied in # position',
        other: 'Applied in # positions'
      })
    )}
    items={student_likes.map(({ job_offer: { content } }) => content)}
  />
)

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

export default withI18n()(CompanyLikedFrom)
