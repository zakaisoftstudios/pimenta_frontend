import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { profileTypes } from '../../constants/profileTypes'
import NotificationBadge from '../atoms/NotificationBadge'

const HeaderMenu = ({
  activeItem,
  profileType,
  handleItemClick,
  chatNotificationsCount
}) => (
  <Wrapper>
    <Menu>
      {profileTypes[profileType].menuItems.map(menuItem => (
        <MenuItem key={menuItem.name}>
          <MenuLink
            to={menuItem.path}
            onClick={handleItemClick(menuItem.name)}
            active={activeItem === menuItem.name ? 1 : 0}
          >
            {menuItem.title}
          </MenuLink>

          {menuItem.name === 'chat' && chatNotificationsCount > 0 && <NotificationBadge/>}
        </MenuItem>
      ))}
    </Menu>
  </Wrapper>
)

const Wrapper = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
`

const Menu = styled.ul`
  display: flex;
  flex: 1;
  justify-content: center;
  list-style-type: none;
`

const MenuItem = styled.li`
  list-style: none;
  margin-left: 2.5rem;
  position: relative;
`

const MenuLink = styled(Link)`
  color: #ffffff;
  font-size: 2rem;
  text-decoration: none;
  font-weight: ${({ active }) => (active ? 'bold' : '300')};
`

HeaderMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  profileType: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  chatNotificationsCount: PropTypes.number.isRequired
}

export default HeaderMenu
