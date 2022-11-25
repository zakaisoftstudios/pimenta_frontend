import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const InputRadioMultiple = ({
  options,
  value = [],
  name,
  labelText,
  handleChange,
  labelComponent,
  className
}) => {
  return (
    <Wrapper className={className}>
      {labelText && <LabelText>{labelText}:</LabelText>}

      <Options>
        {options.map(option => (
          <div key={option.value}>
            {labelComponent({
              htmlFor: `${name}-${option.value}`,
              selected: false && value.includes(option.value),
              text: option.label
            })}

            <Input
              id={`${name}-${option.value}`}
              name={name}
              type="checkbox"
              checked={false && value.includes(option.value)}
              value={option.value}
              onChange={handleChange}
            />
          </div>
        ))}
      </Options>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.6rem;
  width: 100%;
`

const Options = styled.div`
  display: flex;
`

const Input = styled.input`
  visibility: hidden;
`

const LabelText = styled.div`
  color: #fff;
  margin-bottom: 1rem;
`

InputRadioMultiple.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired
}

export default InputRadioMultiple
