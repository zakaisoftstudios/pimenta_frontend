import React from 'react'
import styled from 'styled-components'
import Navigation from '@material-ui/core/BottomNavigation'
import NavigationAction from '@material-ui/core/BottomNavigationAction'
import { withStyles } from '@material-ui/core/styles'
import { Icon } from 'react-icons-kit'
import { Link, withRouter } from 'react-router-dom'
import { breakpoints } from '../../constants/responsive'
import { profileTypes } from '../../constants/profileTypes'
import { connect } from 'react-redux'

const StyledNavigationAction = withStyles({
  root: {
    minWidth: '60px'
  }
})(NavigationAction)

class BottomNavigation extends React.Component {
  render() {
    const { location, profileType } = this.props
    const { pathname } = location
    const index = profileTypes[profileType].menuItems.findIndex(
      item => item.path == pathname
    )
    return (
      <Wrapper>
        <Navigation value={index} showLabels>
          {profileTypes[profileType].menuItems.map(menuItem => (
            <StyledNavigationAction
              key={menuItem.name}
              label={menuItem.title}
              icon={<Icon icon={menuItem.icon} />}
              component={Link}
              to={menuItem.path}
            />
          ))}
        </Navigation>
      </Wrapper>
    )
  }
}

const Wrapper = styled.footer`
  display: block;
  width: 100vw;
  height: 5.6rem;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #e5e5e5;
  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
`

const mapStateToProps = ({ auth: { profileType } }) => ({
  profileType
})

export default connect(mapStateToProps)(withRouter(BottomNavigation))
