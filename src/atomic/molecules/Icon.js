import React from 'react'
import styled from 'styled-components'

export const CardActionIcon = ({
  handleClick = null,
  src,
  bottom = false,
  noMarginBottom = false,
  className
}) => (
  <Wrapper
    className={className}
    onClick={handleClick}
    src={src}
    bottom={bottom}
    noMarginBottom={noMarginBottom}
  />
)

const Wrapper = styled.img`
  width: 2.1rem;
  height: 1.9rem;
  cursor: pointer;
  margin-top: ${({ bottom }) => bottom && 'auto'};
  margin-bottom: ${props => (props.noMarginBottom ? '0' : '1.2rem')};
`
