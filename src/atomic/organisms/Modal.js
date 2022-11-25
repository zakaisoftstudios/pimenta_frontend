import React from 'react'
import styled from 'styled-components'
import modalCloseIcon from '../../assets/icons/modal-close.svg'
import { breakpoints } from '../../constants/responsive'

class Modal extends React.Component {
  listenKeyboard = event => {
    if (event.key === 'Escape' || event.keyCode === 27) this.props.onClose()
  }

  componentDidMount() {
    if (this.props.onClose)
      window.addEventListener('keydown', this.listenKeyboard, true)
  }

  componentWillUnmount() {
    if (this.props.onClose)
      window.removeEventListener('keydown', this.listenKeyboard, true)
  }

  onOverlayClick = () => {
    if (this.props.onClose) this.props.onClose()
  }
  onDialogClick = event => event.stopPropagation()

  render() {
    const { children, title, onClose, resolution } = this.props

    return (
      <React.Fragment>
        <Overlay />

        <Content onClick={this.onOverlayClick}>
          <Dialog onClick={this.onDialogClick}>
            <Body>
              <Title>
                <TitleResolutionBlock>
                  <span>{title}</span>
                  <Resolution>{resolution}</Resolution>
                </TitleResolutionBlock>
                <Close
                  src={modalCloseIcon}
                  alt="Close modal"
                  onClick={onClose}
                />
              </Title>

              <ChildrenContent>{children}</ChildrenContent>
            </Body>
          </Dialog>
        </Content>
      </React.Fragment>
    )
  }
}

const TitleResolutionBlock = styled.div`
  display: flex;
  flex-direction: row;
`

const Resolution = styled.div`
  color: gray;
  font-size: 20px;
  margin-top: 4.6px;
  margin-left: 20px;
  margin-right: 40px;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.25);
`

const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  overflow: auto;
  text-align: center;

  &:after {
    vertical-align: middle;
    display: inline-block;
    height: 100%;
    content: '';
  }
`

const ChildrenContent = styled.div`
  p {
    text-align: left;
    padding: 0 2.5rem;
    font-size: 1.8rem;
    line-height: 1.5;

    @media screen and (min-width: ${breakpoints.sm}) {
      max-width: 50rem;
    }
  }
`

const Dialog = styled.div`
  position: relative;
  outline: 0;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  max-width: auto;
  cursor: default;
  border-radius: 4px;
  min-width: 20rem;
  @media (min-width: ${breakpoints.sm}) {
    width: auto;
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  color: #01c0ea;
  padding: 2.4rem;
  align-items: center;
`

const Close = styled.img`
  cursor: pointer;
`

export default Modal
