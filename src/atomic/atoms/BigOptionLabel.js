import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from '../../constants/colors'
import { breakpoints } from '../../constants/responsive'

const BigOptionLabel = ({ selected = false, htmlFor, text }) => (
  <Wrapper selected={selected} htmlFor={htmlFor}>
    {text}
  </Wrapper>
)

const Wrapper = styled.label`
  display: block;
  width: 100%;
  height: 5rem;
  text-align: center;
  vertical-align: middle;
  color: ${({ selected }) => (selected ? '#01C0EA' : colors.white)};
  background-color: ${({ selected }) =>
    selected ? colors.white : 'rgba(255, 255, 255, 0.15)'};
  font-size: 1.8rem;
  border-radius: 100px;
  border: ${({ selected }) =>
    selected ? '2px solid #FFFFFF' : '2px solid transparent'};
  padding-top: 1.1rem;
  cursor: pointer;
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* @media (min-width: ${breakpoints.sm}) {
    width: 13rem;
  } */
`

BigOptionLabel.propTypes = {
  selected: PropTypes.bool,
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default BigOptionLabel
