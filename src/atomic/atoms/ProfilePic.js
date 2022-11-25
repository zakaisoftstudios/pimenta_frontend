import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { profilePicTypes } from '../../constants/componentTypes'
import blankProfilePic from '../../assets/blank-profile-pic.svg'
import editRoundedIcon from '../../assets/icons/edit-rounded.svg'

const ProfilePic = ({
  profilePic = blankProfilePic,
  type = profilePicTypes.MINI,
  editing = false,
  handleEditAvatar,
  className
}) => (
  <Wrapper className={className}>
    <Avatar profilePic={profilePic} type={type} />

    {editing && (
      <CoverEditButton
        src={editRoundedIcon}
        onClick={handleEditAvatar}
        alt="Edit avatar image"
      />
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  ${'' /* position: relative; */}
`

const Avatar = styled.div`
  width: ${({ type }) => getPicSize(type)};
  height: ${({ type }) => getPicSize(type)};;
  background-image: url(${({ profilePic }) => profilePic || blankProfilePic})};
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background-position: center center;
  background-repeat: no-repeat;
`

const CoverEditButton = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

const getPicSize = type => {
  switch (type) {
    case profilePicTypes.BIG:
      return '11.87rem'
    case profilePicTypes.MEDIUM:
      return '6.52rem'
    case profilePicTypes.MINI:
      return '4rem'
  }
}

ProfilePic.propTypes = {
  profilePic: PropTypes.string,
  type: PropTypes.string
}

export default ProfilePic
