import React from 'react'
import styled from 'styled-components'
import arrowDownIcon from '../../assets/icons/arrow-down.svg'
import arrowUpIcon from '../../assets/icons/arrow-up.svg'

const Card = ({ children, handleClick = null, rejected, className }) => (
  <Wrapper
    className={className}
    onClick={handleClick}
    clickable={handleClick}
    rejected={rejected}
  >
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  background: #ffffff;
  border: 0.5px solid #f3f3f3;
  box-sizing: border-box;
  box-shadow: ${props =>
    props.rejected
      ? '2px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(189,104,104,1)'
      : '2px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.1)'};
  border-radius: 5px;
  padding: 1.2rem;
  margin-bottom: 2.4rem;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

export default Card

export class CardDropdown extends React.Component {
  state = {
    open: false
  }

  handleToogleOpen = () => {
    if (this.hasItems()) this.setState(prev => ({ open: !prev.open }))
  }

  hasItems = () => this.props.items.length > 0

  render() {
    const { open } = this.state
    const { items, title } = this.props

    return (
      <DropdownWrapper>
        <DropdownHeading
          onClick={this.handleToogleOpen}
          open={open}
          hasItems={this.hasItems()}
        >
          <div>{title}</div>

          {this.hasItems() && (
            <ArrowIcon
              src={open ? arrowUpIcon : arrowDownIcon}
              alt="Arrow icon"
            />
          )}
        </DropdownHeading>

        {open && (
          <ul>
            {items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </DropdownWrapper>
    )
  }
}

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #c4c4c4;
  padding-top: 1.4rem;
  padding-left: 1rem;
  padding-right: 0.4rem;
  padding-bottom: ${props => (props.open ? '1rem' : '0')};

  ul {
    margin: 0 0 0 0.4rem;
    padding: 0 0 0 1.2rem;
  }

  li {
    font-weight: 300;
    margin-bottom: 0.8rem;
  }
`

const DropdownHeading = styled.div`
  display: flex;
  font-style: italic;
  font-weight: 300;
  font-size: 12px;
  justify-content: space-between;
  cursor: ${props => (props.hasItems ? 'pointer' : '')};
  margin-bottom: ${({ open }) => open && '1.6rem'};
`

const ArrowIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
