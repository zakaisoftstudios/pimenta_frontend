import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

export default () => <StyledDivider />

const StyledDivider = styled.div`
  border-bottom: 1px solid ${colors.divider};
  width: 100%;
`
