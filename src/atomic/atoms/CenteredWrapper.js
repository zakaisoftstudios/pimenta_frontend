import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CenteredWrapper = ({
  children,
  columns = false,
  withGradientBackground = false
}) => (
  <Wrapper columns={columns} withGradientBackground={withGradientBackground}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  margin: auto;
  flex-direction: ${({ columns }) => (columns ? 'column' : 'row')};
  background: ${({ withGradientBackground }) =>
    withGradientBackground
      ? 'linear-gradient(166.17deg, #01C0EA 6.25%, rgba(1, 197, 229, 0.846178) 21.97%, rgba(0, 222, 208, 0.71) 99.41%)'
      : ''};
`

CenteredWrapper.propTypes = {
  columns: PropTypes.bool,
  withGradientBackground: PropTypes.bool
}

export default CenteredWrapper
