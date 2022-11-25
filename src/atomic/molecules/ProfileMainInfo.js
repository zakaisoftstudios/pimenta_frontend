import React from 'react'
import styled from 'styled-components'
import ProfilePic from '../atoms/ProfilePic'
import { profilePicTypes } from '../../constants/componentTypes'
import blankProfilePic from '../../assets/blank-profile-pic.svg'
import PropTypes from 'prop-types'
import editRoundedIcon from '../../assets/icons/edit-rounded.svg'
import { breakpoints } from '../../constants/responsive'
import LogoutContainer from '../../containers/Logout'
import Responsive from 'react-responsive'

const ProfileMainInfo = ({
  coverImage = blankProfilePic,
  profilePic = blankProfilePic,
  name,
  detailsComponent,
  handleEditCover,
  handleEditAvatar,
  editing = false,
  className
}) => (
  <Wrapper className={className}>
    <CoverImageWrapper>
      <CoverImage
        src={coverImage || blankProfilePic}
        alt="Profile cover image"
      />

      {editing && (
        <CoverEditButton
          src={editRoundedIcon}
          onClick={handleEditCover}
          alt="Edit cover image"
        />
      )}
    </CoverImageWrapper>

    <StyledProfilePic
      type={profilePicTypes.BIG}
      profilePic={profilePic || blankProfilePic}
      handleEditAvatar={handleEditAvatar}
      editing={editing}
    />

    <Name>{name}</Name>
    <Responsive maxWidth={breakpoints.sm}>
      <LogoutContainer />
    </Responsive>
    <DetailsWrapper>{detailsComponent}</DetailsWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: #ffff;
  position: relative;
  align-items: center;
  margin-right: 1.6rem;
  align-self: flex-start;
  padding-bottom: 4.8rem;
  width: 100%;
  @media (min-width: ${breakpoints.sm}) {
    width: 28.88rem;
  }
`

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
`

const CoverImage = styled.img`
  width: 100%;
  height: 12.07rem;
  object-fit: cover;
  @media (min-width: ${breakpoints.sm}) {
    width: 28.88rem;
  }
`

const CoverEditButton = styled.img`
  position: absolute;
  bottom: 0.7rem;
  right: 2.38rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

const StyledProfilePic = styled(ProfilePic)`
  position: absolute;
  top: 7.5rem;
  text-align: center;
`

const Name = styled.div`
  font-weight: 500;
  font-size: 25px;
  color: #1d1d1d;
  margin-top: 9rem;
  text-align: center;
`

const DetailsWrapper = styled.div`
  margin-top: 1.2rem;
`

export default ProfileMainInfo
