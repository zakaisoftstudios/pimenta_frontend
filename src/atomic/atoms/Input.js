import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import Label from './Label'
import Cleave from 'cleave.js/react'

const Input = ({
  name,
  value = '',
  disabled = false,
  error = null,
  handleChange,
  handleBlur,
  handleFocus,
  placeholder = '',
  icon = null,
  type = 'text',
  special = false,
  withMargin,
  className,
  label = null,
  formatOptions,
  ...inputProps
}) => (
  <Wrapper>
    {label && <Label>{label}</Label>}

    <BackgroundWrapper
      icon={icon}
      special={special}
      withMargin={withMargin}
      className={className}
      special={special}
    >
      <StyledInput
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={disabled}
        error={error}
        placeholder={placeholder}
        icon={icon}
        onBlur={handleBlur}
        special={special}
        options={formatOptions}
        as={formatOptions ? FormattedInput : undefined}
        {...inputProps}
      />

      <ErrorMessage special={special}>{error}</ErrorMessage>
    </BackgroundWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const BackgroundWrapper = styled.div`
  background-image: ${({ icon }) => (icon ? `url(${icon})` : '')};
  background-size: ${({ icon }) => (icon ? '2.3rem 2.3rem' : '')};
  background-position: ${({ icon }) => (icon ? '0 0%' : '')};
  background-repeat: ${({ icon }) => (icon ? 'no-repeat' : '')};
  display: inline-block;
  margin-right: ${({ withMargin }) => withMargin && '2rem'};
  padding-top: 0.5rem;
  margin-bottom: ${({ special }) => (special ? '2.4rem' : '0')};
`

const FormattedInput = props => <Cleave {...props} />

const StyledInput = styled.input`
  padding-bottom: 1rem;
  padding-left: ${({ icon }) => (icon ? '3.5rem' : '1.5rem')};
  background-color: transparent;
  border-style: none;
  border-bottom: 2px solid
    ${({ error, special }) => {
      if (error) {
        return '#F54A4A'
      } else {
        return special ? colors.white : '#bdbdbd'
      }
    }};
  line-height: 1.6rem;
  transition: ${({ special }) =>
    special ? '' : 'border linear 0.2s, box-shadow linear 0.2s'};
  color: ${({ special }) => (special ? colors.white : '#646464')};
  outline: none;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::placeholder {
    color: ${({ special }) =>
      special ? colors.lightWhite : '#C4C4C4 !important'};
    font-style: italic;
    vertical-align: bottom;
    font-weight: 600;
  }

  &:focus:not(:read-only):not(:disabled) {
    outline: 0;
    border-bottom: 2px solid
      ${({ error, special }) => {
        if (error) {
          return '#F54A4A'
        } else {
          return special ? '#ffff' : '#01c0ea'
        }
      }};
  }

  &:hover:not(:focus):not(:read-only):not(:disabled) {
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

  &:disabled {
    color: #c4c4c4;
  }

  &:read-only {
    color: #c4c4c4;
    cursor: default;
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: ${({ special }) =>
      special ? colors.white : '#646464'};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background 0s 50000s;
  }
`

export default Input
