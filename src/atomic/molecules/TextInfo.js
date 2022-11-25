import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SubHeading from '../atoms/SubHeading'

const TextInfo = ({ title, content, breakNewLines }) => {
  return (
  <Wrapper>
    <SubHeading>{title}</SubHeading>
    { content ? 
      <Content>
        {breakNewLines ? 
            <List>{content.split('\n').map(line => <li>{line}</li>)}</List> : content }
      </Content> : '' }
  </Wrapper>
)}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #646464;
  margin-bottom: 2.4rem;
`

const Content = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
`

const List = styled.ul `
  padding-inline-start: 15px;
`


TextInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  breakNewLines: PropTypes.bool
}

export default TextInfo
