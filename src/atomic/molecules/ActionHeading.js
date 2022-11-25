import React from 'react'
import styled from 'styled-components'
import Heading from '../atoms/Heading'
import Button from '../atoms/Button'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ActionHeading = ({ title, actionName, actionPath, buttonIcon }) => (
  <Wrapper>
    <StyledHeading>{title}</StyledHeading>

    <Link to={actionPath}>
      <Button icon={buttonIcon}>{actionName}</Button>
    </Link>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`

ActionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
  actionPath: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string
}

export default ActionHeading
