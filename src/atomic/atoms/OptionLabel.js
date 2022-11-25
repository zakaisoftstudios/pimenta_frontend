import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const OptionLabel = ({ selected = false, htmlFor, text, rounded = false }) => (
  <Wrapper selected={selected} htmlFor={htmlFor} rounded={rounded}>
    {text}
  </Wrapper>
)

const Wrapper = styled.label`
  display: block;
  width: 6.5rem;
  height: 3rem;
  text-align: center;
  vertical-align: middle;
  color: ${({ selected }) => (selected ? '#FFFF' : '#01C0EA')};
  background-color: ${({ selected }) => (selected ? '#01C0EA' : '#ffff')};
  border-radius: ${({ rounded }) => (rounded ? '100px' : '10px')};
  border: 2px solid #01c0ea;
  padding-top: 0.5rem;
  cursor: pointer;
  margin-left: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:last-child {
    margin-right: 0;
  }
`

OptionLabel.propTypes = {
  selected: PropTypes.bool,
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default OptionLabel
