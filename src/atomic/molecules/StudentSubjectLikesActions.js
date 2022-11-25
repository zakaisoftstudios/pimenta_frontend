import React from 'react'
import styled from 'styled-components'
import trashIcon from '../../assets/icons/trash.svg'
import { CardActionIcon } from './Icon'
import { ActionsWrapper } from '../atoms/Card'

const StudentSubjectLikesActions = ({ handleRemoveSubjectLike, className }) => (
  <Wrapper className={className}>
    <CardActionIcon
      src={trashIcon}
      handleClick={handleRemoveSubjectLike}
      bottom
    />
  </Wrapper>
)

const Wrapper = styled(ActionsWrapper)`
  padding-bottom: 1.2rem;
`

export default StudentSubjectLikesActions
