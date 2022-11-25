import React from 'react'
import styled from 'styled-components'
import trashIcon from '../../assets/icons/trash.svg'

const JobOfferCardActions = ({ handleRemoveJobOffer, className }) => (
  <Wrapper className={className}>
    <TrashIcon src={trashIcon} onClick={handleRemoveJobOffer} />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 21px;
`

const ChatIcon = styled.img`
  width: 2.2rem;
  height: 1.8rem;
  cursor: pointer;
`

const TrashIcon = styled.img`
  width: 1.8rem;
  height: 1.9rem;
  cursor: pointer;
  margin-top: auto;
`

export default JobOfferCardActions
