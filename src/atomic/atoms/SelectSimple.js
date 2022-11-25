import React from 'react'
import styled from 'styled-components'
import Downshift from 'downshift'
import ErrorMessage from './ErrorMessage'
import selectArrowIcon from '../../assets/icons/select-arrow.svg'
import Label from './Label'

const SelectSimple = ({
  name,
  value,
  options,
  placeholder = '',
  handleChange,
  handleInputChange = null,
  error = null,
  withMargin,
  label = null,
  className
}) => (
  <Wrapper withMargin={withMargin}>
    <Downshift
      onChange={handleChange}
      itemToString={item => (item ? item.label : '')}
      initialSelectedItem={options.find(option => {
        const valueToCompare = value && (value.value || value)
        return option.value === valueToCompare
      })}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        openMenu,
        selectItem
      }) => (
        <div>
          <SelectWrapper className={className}>
            {label && <Label>{label}</Label>}

            <InputBackground icon={selectArrowIcon} onClick={openMenu}>
              <StyledInput
                name={name}
                placeholder={placeholder}
                {...getInputProps({
                  onChange: e =>
                    handleInputChange
                      ? handleInputChange(e.target.value)
                      : selectItem('')
                })}
                error={error}
              />
            </InputBackground>

            {isOpen ? (
              <Items {...getMenuProps()}>
                {options.map((item, index) => (
                  <Item
                    highlighted={highlightedIndex === index}
                    selected={selectedItem === item}
                    {...getItemProps({
                      key: index,
                      index,
                      item
                    })}
                  >
                    {item.label}
                  </Item>
                ))}
              </Items>
            ) : null}
          </SelectWrapper>

          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}
    </Downshift>
  </Wrapper>
)

const Wrapper = styled.div`
  margin-right: ${({ withMargin }) => withMargin && '2rem'};
  padding-top: 0.5rem;
  width: 100%;
  position: relative;
`

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bttom: 0.5rem;
  position: relative;
`

const InputBackground = styled.div`
  background-image: ${({ icon }) => `url(${icon})`};
  background-position: right -0.6rem;
  background-repeat: no-repeat;
  display: inline-block;
`

const StyledInput = styled.input`
  height: auto;
  padding-bottom: 1rem;
  padding-left: ${({ icon }) => (icon ? '4.5rem' : '1.5rem')};
  padding-right: 3rem;
  background-color: transparent;
  border-style: none;
  transition: ${({ special }) =>
    special ? '' : 'border linear 0.2s, box-shadow linear 0.2s'};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ error, special }) => {
      if (error) {
        return '#F54A4A'
      } else {
        return special ? '#FFFF' : '#bdbdbd'
      }
    }};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #646464;
  font-weight: normal;
  outline: none;
  width: 100%;

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
          return special ? '#FFFF' : '#01c0ea'
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
          return special ? '#FFFF' : '#757575'
        }
      }};
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: #ffff;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
  }
`

const Items = styled.ul`
  background: #ffffff;
  width: 100%;
  border: 0.5px solid #f3f3f3;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0;
  list-style-type: none;
  padding: 1.3rem 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  max-height: 20rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-thumb {
    border: 6px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 100px;
    background-color: #c4c4c4;
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

const Item = styled.li`
  background: ${({ highlighted }) => highlighted && '#c4c4c4'};
  font-weight: ${({ selected }) => selected && 'bold'};
  padding: 0.5rem 1rem;
  cursor: pointer;
`

export default SelectSimple
