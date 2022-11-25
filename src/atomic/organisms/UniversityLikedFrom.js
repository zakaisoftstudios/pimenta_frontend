import React from 'react'
import styled from 'styled-components'
import StudentCard from '../molecules/StudentCard'
import Loader from '../atoms/Loader'
import CompanyLikedFromActions from '../molecules/CompanyLikedFromActions'
import ItalicText from '../atoms/ItalicText'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import { CardDropdown } from '../atoms/Card'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const UniversityLikedFrom = ({
  subjectLikes,
  loading,
  handleShowStudentProfile,
  i18n
}) => (
  <SectionBox>
    <StyledHeading>
      <Trans>Liked from</Trans>
    </StyledHeading>

    {loading ? (
      <Loader />
    ) : (
      <Wrapper>
        {subjectLikes.length > 0 ? (
          subjectLikes.map(subjectLike => (
            <StudentCard
              key={subjectLike.id}
              profile={subjectLike}
              handleShowStudentProfile={handleShowStudentProfile(subjectLike)}
              dropdown={getLikedDropdown(subjectLike.student_likes, i18n)}
            />
          ))
        ) : (
          <ItalicText>
            <Trans>no one liked your subjects yet</Trans>
          </ItalicText>
        )}
      </Wrapper>
    )}
  </SectionBox>
)

const getLikedDropdown = (student_likes, i18n) => (
  <CardDropdown
    title={i18n._(t`Liked ${student_likes.length} subject offers`)}
    items={student_likes.map(({ subject_offer: { name } }) => name)}
  />
)

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 2.8rem;
`

export default withI18n()(UniversityLikedFrom)
