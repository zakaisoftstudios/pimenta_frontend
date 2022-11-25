import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../constants/colors'
import ErrorMessage from '../atoms/ErrorMessage'
import { breakpoints } from '../../constants/responsive'

const InputRadio = ({
  options,
  value = '',
  name,
  labelText,
  handleChange,
  labelComponent,
  className,
  loginFlow,
  error = null
}) => (
  <Wrapper className={className} loginFlow={loginFlow}>
    {labelText && <LabelText loginFlow={loginFlow}>{labelText}</LabelText>}

    <Options>
      {options.map(option => (
        <LabelWrapper key={option.value} loginFlow={loginFlow}>
          {labelComponent({
            htmlFor: `${name}-${option.value}`,
            selected: value && option.value === value.toString(),
            text: option.label
          })}

          <Input
            id={`${name}-${option.value}`}
            name={name}
            type="radio"
            checked={value && value.toString() === option.value}
            value={option.value}
            onChange={handleChange}
          />
        </LabelWrapper>
      ))}
    </Options>

    <ErrorMessage>{error}</ErrorMessage>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ loginFlow }) => (loginFlow ? '2.6rem' : '0')};
  width: 100%;
`

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Input = styled.input`
  visibility: hidden;
`

const LabelWrapper = styled.div`
  width: ${props => (props.loginFlow ? '100%' : 'auto')};

  /* @media (min-width: ${breakpoints.sm}) {
    width: auto;
  } */
`

const LabelText = styled.div`
  ${({ loginFlow }) => {
    if (loginFlow) {
      return `
        color: #fff;
        margin-bottom: 1rem;  
      `
    } else {
      return `
        font-style: italic;
        font-size: 14px;
        color: ${colors.labelColor};
        padding-left: 1.5rem;
        margin-bottom: 1.2rem;
      `
    }
  }};
`

InputRadio.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired
}

export default InputRadio
