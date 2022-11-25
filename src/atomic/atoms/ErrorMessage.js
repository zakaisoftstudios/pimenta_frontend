import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import fontSizes from '../../constants/fontSizes'

const ErrorMessage = ({ children, special, className }) => (
  <Wrapper className={className} special={special}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  color: ${({ special }) => (special ? colors.lightWhite : '#F54A4A')};
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-align: right;
  min-height: ${fontSizes.minHeightSmall};
  width: 100%;
`

export default ErrorMessage
