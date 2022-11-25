import React from 'react'
import styled from 'styled-components'
import { date } from '../../services/locale'
import { Link } from 'react-router-dom'
import editIcon from '../../assets/icons/edit.svg'
import Button from '../atoms/Button'
import ItalicText from '../atoms/ItalicText'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const SubjectDetailsHeading = ({
  name,
  createdAt,
  numberOfPlaces,
  id,
  className,
  showEdit = true,
  i18n
}) => (
  <Wrapper className={className}>
    <Info>
      <Name>{name}</Name>

      <Details>
        <StyledItalicText>
          <Trans>Posted at {i18n._(t`${date(createdAt)}`)}</Trans>
        </StyledItalicText>
        <StyledItalicText>
          {numberOfPlaces && <Trans>{numberOfPlaces} free places</Trans>}
        </StyledItalicText>
      </Details>
    </Info>

    {showEdit && (
      <Link to={`/university/subject-offers/${id}/edit`}>
        <Button icon={editIcon}>
          <Trans>Edit</Trans>
        </Button>
      </Link>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100vw;
  margin-bottom: 3.6rem;
  justify-content: space-between;
  align-items: flex-start;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 2.4rem;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.div`
  font-weight: 500;
  font-size: 25px;
  color: #000000;
  word-wrap: break-word;
  max-width: calc(100vw - 130px);
  margin-bottom: 0.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledItalicText = styled(ItalicText)`
  color: #c4c4c4;
`

const EditWrapper = styled.div`
  flex: 0 0 60px;
`

export default withI18n()(SubjectDetailsHeading)
