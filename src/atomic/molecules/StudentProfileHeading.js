import React from 'react'
import styled from 'styled-components'
import ProfilePic from '../atoms/ProfilePic'
import { profilePicTypes } from '../../constants/componentTypes'

const StudentProfileHeading = ({
  picture,
  name,
  graduation,
  big,
  handleClick
}) => (
  <Wrapper onClick={handleClick} clickable={handleClick}>
    <ProfilePic profilePic={picture} type={profilePicTypes.MEDIUM} />

    <Info>
      <Name big={big}>{name}</Name>
      <Graduation>{graduation}</Graduation>
    </Info>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ big }) => (big ? 'flex-end' : 'center')};
  margin-left: 1.2rem;
`

const Name = styled.div`
  font-weight: ${({ big }) => (big ? '500' : '300')};
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  color: #000000;
  margin-bottom: ${({ big }) => (big ? '0.6rem' : '0.2rem')};
`

const Graduation = styled.div`
  font-weight: ${({ big }) => (big ? 'normal' : '300')};
`

export default StudentProfileHeading
