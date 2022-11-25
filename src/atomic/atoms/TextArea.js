import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import TextareaAutosize from 'react-autosize-textarea'
import Label from './Label'

const TextArea = ({
  name,
  value = '',
  disabled = false,
  error = null,
  handleChange,
  handleBlur,
  placeholder = '',
  type = 'text',
  className,
  label = null,
  regularLabel = false
}) => (
  <Wrapper className={className}>
    {label && regularLabel ? (
      <Label>{label}</Label>
    ) : (
      <BigLabel>{label}</BigLabel>
    )}

    <StyledTextArea
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      onBlur={handleBlur}
    />

    <ErrorMessage>{error}</ErrorMessage>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const BigLabel = styled.label`
  font-size: 20px;
  margin-bottom: 1.2rem;
`

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  rows: 1;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  background-color: transparent;
  border-style: none;
  border-bottom: 2px solid ${({ error }) => (error ? '#F54A4A' : '#bdbdbd')};
  transition: border linear 0.2s, box-shadow linear 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: '#646464';
  font-weight: normal;
  margin-bottom: 0.5rem;
  outline: none;
  width: 100%;
  font-weight: 300;
  line-height: 1.5;

  &::placeholder {
    color: #c4c4c4;
    font-style: italic;
    vertical-align: bottom;
  }

  &:focus {
    outline: 0;
    border-bottom: 2px solid
      ${({ error, special }) => {
        if (error) {
          return '#F54A4A'
        } else {
          return special ? colors.white : '#01c0ea'
        }
      }};
  }

  &:hover:not(:focus) {
    outline: 0;
    border-bottom: 2px solid
      ${({ error, special }) => {
        if (error) {
          return '#F54A4A'
        } else {
          return special ? colors.white : '#757575'
        }
      }};
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: ${colors.white};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
  }
`

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  placeholder: PropTypes.string
}

export default TextArea
