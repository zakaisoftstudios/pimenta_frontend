import React from 'react'
import styled from 'styled-components'

const DisplayImage = ({ className, src, alt }) => (
  <Wrapper className={className} src={src} alt={alt} />
)

const Wrapper = styled.img`
  width: 34.7rem;
  height: 23.33rem;
  object-fit: cover;
  margin-bottom: 2.4rem;
`

export default DisplayImage
