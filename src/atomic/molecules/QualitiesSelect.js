import React from 'react'
import Select_ from 'react-select'
import styled from 'styled-components'
import ErrorMessage from '../atoms/ErrorMessage'
import colors from '../../constants/colors'
import fontSizes from '../../constants/fontSizes'
import PropTypes from 'prop-types'
import Label from '../atoms/Label'

const Select = ({
  options,
  name,
  error = null,
  handleChange,
  handleBlur,
  value,
  label,
  placeholder = '',
  multi,
  className
}) => (
  <Wrapper className={className}>
    {label && <Label>{label}</Label>}

    <SelectWrapper>
      <Select_
        placeholder={placeholder}
        isMulti={multi}
        name={name}
        options={options}
        value={value}
        styles={selectStyles(error)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </SelectWrapper>

    <ErrorMessage>{error}</ErrorMessage>
  </Wrapper>
)

const selectStyles = error => ({
  multiValueLabel: styles => ({
    ...styles,
    backgroundColor: '#01C0EA',
    fontSize: `${fontSizes.small}`,
    color: '#FFFF',
    borderLeftRadius: '50%'
  }),
  multiValueRemove: styles => ({
    ...styles,
    backgroundColor: '#01C0EA',
    fontSize: `${fontSizes.small}`,
    color: '#FFFF',
    borderRightRadius: '50%'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  clearIndicator: (styles, state) => ({
    ...styles,
    color: `${state.isFocused ? colors.gray : colors.lightGray}`,
    display: 'none'
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: `${state.isFocused ? colors.gray : colors.lightGray}`
  }),
  control: (styles, { selectProps: { menuIsOpen, isFocused } }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: '37px',
    outline: '0 !important',
    position: 'relative',
    backgroundColor: '#FFFF',
    borderBottom: `2px solid ${
      error ? '#F54A4A' : menuIsOpen ? '#01c0ea' : '#bdbdbd'
    }`,
    boxShadow: 'none',
    boxSizing: 'border-box',
    appearance: 'none',
    fontWeight: 'normal',
    transition: 'border linear 0.2s, box-shadow linear 0.2s',

    ':hover': {
      borderBottom: `2px solid ${
        error ? '#F54A4A' : menuIsOpen ? '#01c0ea' : '#757575'
      }`
    }
  }),
  placeholder: styles => ({
    fontStyle: 'italic',
    fontSize: '14px',
    color: '#c4c4c4',
    marginBottom: '0.7rem'
  })
})

const Wrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
`

const SelectWrapper = styled.div`
  margin-bottom: 0.5rem;
  width: 100%;
`

Select.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  // value: PropTypes.array,
  multi: PropTypes.bool
}

export default Select
