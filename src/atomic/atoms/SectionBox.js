import React from 'react'
import styled from 'styled-components'
import flexDirections from '../../constants/flexDirections'
import FullHeightBox from '../atoms/FullHeightBox'

const SectionBox = ({
  children,
  className,
  direction = flexDirections.COLUMN
}) => (
  <Wrapper className={className} direction={direction}>
    {children}
  </Wrapper>
)

const Wrapper = styled(FullHeightBox)`
  background: #ffffff;
  flex: 1;
  flex-direction: ${({ direction }) => direction};
  display: flex;
  padding: 2.4rem;
`

export default SectionBox
