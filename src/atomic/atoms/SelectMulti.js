import React from 'react'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'
import selectArrowIcon from '../../assets/icons/select-arrow.svg'
import Label from '../atoms/Label'

class SelectMulti extends React.Component {
  constructor(props) {
    super(props)
    this.menuRef = React.createRef()
    this.inputBackgroundRef = React.createRef()
  }

  state = {
    isOpen: false,
    selectedItems: []
  }

  componentDidMount() {
    const { value } = this.props
    this.setState({
      selectedItems: value ? value.map(option => option.value) : []
    })
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false)
  }

  handleClickOutside = e => {
    if (!this.state.isOpen) return

    if (
      this.menuRef.current.contains(e.target) ||
      this.inputBackgroundRef.current.contains(e.target)
    )
      return

    this.handleOpenMenu(false)()
  }

  handleOpenMenu = isOpen => () => this.setState({ isOpen })

  handleMenuRef = menuEl => (this.menuRef = menuEl)

  handleInputBackgroundRef = inputBackgroundEl =>
    (this.inputBackgroundRef = inputBackgroundEl)

  handleItemClick = e => {
    const { selectedItems } = this.state
    const { limit, handleChange } = this.props
    const {
      target: { value, checked }
    } = e

    if (checked && limit && selectedItems.length >= limit) return

    this.setState(
      () => ({
        selectedItems: checked
          ? [...selectedItems, value]
          : selectedItems.filter(selectedItem => selectedItem !== value)
      }),
      () => handleChange(this.getSelectedOptions())
    )
  }

  getSelectedOptions = () =>
    this.props.options.filter(option =>
      this.state.selectedItems.includes(option.value)
    )

  getInputValue = () =>
    this.getSelectedOptions()
      .map(option => option.label)
      .join(', ')

  isDisabledOption = option => {
    const { disabledOptions } = this.props

    return (
      disabledOptions &&
      disabledOptions.some(disabledOption => disabledOption.id === option.id)
    )
  }

  render() {
    const {
      width,
      error,
      className,
      name,
      placeholder,
      label,
      options,
      withMargin
    } = this.props

    const { isOpen, selectedItems } = this.state

    return (
      <Wrapper width={width} withMargin={withMargin}>
        <SelectWrapper className={className}>
          {label && <Label>{label}</Label>}

          <InputBackground
            icon={selectArrowIcon}
            onClick={this.handleOpenMenu(!isOpen)}
            ref={this.inputBackgroundRef}
          >
            <StyledInput
              name={name}
              placeholder={placeholder}
              value={this.getInputValue()}
              isOpen={isOpen}
            />
          </InputBackground>

          {isOpen ? (
            <Items ref={this.menuRef}>
              {options.map(item => {
                const isDisabledOption = this.isDisabledOption(item)

                return (
                  <Item key={item.value}>
                    <Checkbox
                      id={`${item.value}-id`}
                      type="checkbox"
                      name={item.value}
                      value={item.value}
                      onClick={this.handleItemClick}
                      checked={selectedItems.includes(item.value)}
                      disabled={isDisabledOption}
                    />
                    <CheckboxLabel
                      htmlFor={`${item.value}-id`}
                      disabled={isDisabledOption}
                    >
                      {item.label}
                    </CheckboxLabel>
                  </Item>
                )
              })}
            </Items>
          ) : null}
        </SelectWrapper>

        <ErrorMessage>{error}</ErrorMessage>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: ${({ width }) => width};
  padding-top: 0.5rem;
  ${'' /* margin-bottom: 2.4rem; */}
  width: 100%;
  margin-right: ${({ withMargin }) => withMargin && '2rem'};
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
  padding-bottom: 1rem;
  padding-left: ${({ icon }) => (icon ? '4.5rem' : '1.5rem')};
  padding-right: 3rem;
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  transition: ${({ special }) =>
    special ? '' : 'border linear 0.2s, box-shadow linear 0.2s'};
  border-bottom: 2px solid
    ${({ error, isOpen }) => {
      if (error) {
        return '#F54A4A'
      } else {
        return isOpen ? '#01c0ea' : '#bdbdbd'
      }
    }};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: transparent;
  text-shadow: 0 0 0 #646464;
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
      ${({ error, isOpen }) => {
        if (error) {
          return '#F54A4A'
        } else {
          return isOpen ? '#01c0ea' : '#757575'
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #ffffff;
  width: 100%;
  border: 0.5px solid #f3f3f3;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0;
  list-style-type: none;
  padding: 1.2rem 0 0 1rem;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  overflow-y: scroll;
  max-height: 22.7rem;
  padding-right: 1.5rem;

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
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  width: 11rem;
  flex-shrink: 0;
`

const Checkbox = styled.input`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 1.2rem;
  width: 1.9rem;
  height: 1.9rem;
`

const CheckboxLabel = styled.label`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ disabled }) => (disabled ? '#b9b9b3' : 'inherit')};
`

export default SelectMulti
