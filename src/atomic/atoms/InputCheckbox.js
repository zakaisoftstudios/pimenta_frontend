import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import Label from './Label'
import checkBlankIcon from '../../assets/icons/checkbox-blank-outline.svg'
import checkMarkedIcon from '../../assets/icons/checkbox-marked-outline.svg'

const InputCheckbox = ({
  children,
  name,
  value = '',
  disabled = false,
  error = null,
  handleChange,
  handleBlur,
  type = 'checkbox',
  special = false,
  withMargin,
  className,
  checked = false
}) => (
  <Wrapper>
      <StyledInput
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        error={error}
        onChange={handleChange}
        id={name}
        onBlur={handleBlur}
        special={special}
        checked={checked}
      />

      {children && <LabelText htmlFor={name}>{children}</LabelText>}
      <ErrorMessage special={special}>{error}</ErrorMessage>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const LabelText = styled.label`

`

const StyledInput = styled.input`
  display: none;

  &+label {
    padding: 0;
    font-size: 1.4rem;
    color: ${colors.white};

    &:before {
      content: ' ';
      display: inline-block;
      vertical-align: middle;
      width: 2.6rem;
      height: 2.6rem;
      margin-right: 0.3rem;
      background-image: url(${checkBlankIcon});
    }
  }

  &:checked {
    &+label {
      &:before {
        background-image: url(${checkMarkedIcon});
        transition: 0.5s background;
      }
    }
  }
`

export default InputCheckbox
