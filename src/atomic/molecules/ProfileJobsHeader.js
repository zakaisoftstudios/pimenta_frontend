import React from 'react'
import styled from 'styled-components'
import ProfilePic from '../atoms/ProfilePic'
import { profilePicTypes } from '../../constants/componentTypes'
import { Plural } from '@lingui/macro'

const ProfileJobsHeader = ({ userName, profilePic, totalItemsCount }) => (
  <Wrapper>
    <ProfilePic
      type={profilePicTypes.MEDIUM}
      profilePic={profilePic}
      userName={userName}
    />

    <Details>
      <UserName>{userName}</UserName>
      <div>
        <Plural
          value={totalItemsCount}
          one="# Job Offer found"
          other="# Job Offers found"
        />
      </div>
    </Details>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  margin-bottom: 6rem;
  flex-shrink: 0;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.2rem;
  justify-content: flex-end;
`

const UserName = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #1d1d1d;
  margin-bottom: 0.6rem;
`

export default ProfileJobsHeader
