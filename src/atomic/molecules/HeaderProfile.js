import React from 'react'
import styled from 'styled-components'
import ProfilePicContainer from '../../containers/ProfilePic'
import LogoutContainer from '../../containers/Logout'

const HeaderProfile = () => (
  <Wrapper>
    <StyledProfilePicContainer />
    <LogoutContainer />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledProfilePicContainer = styled(ProfilePicContainer)`
  margin-right: 2.5rem;
`

export default HeaderProfile
