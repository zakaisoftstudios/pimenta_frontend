import React, { useState, useEffect } from 'react'
import Heading from '../../../atomic/atoms/Heading'
import SubHeading from '../../../atomic/atoms/SubHeading'
import * as AdminProfileAPI from '../../../services/api/adminProfile'
import { Trans } from '@lingui/macro'
import { Wrapper } from '../styles'

export default function Profile() {
  const [data, setData] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await AdminProfileAPI.get()
    setData(data)
  }

  return (
    <Wrapper>
      <Heading>
        <Trans>About me</Trans>
      </Heading>
      <SubHeading>Details</SubHeading>
      
      <p>
        <Trans>Name</Trans>: <b>{data.name}</b>
      </p>
      <p>
        <Trans>Email</Trans>: <b>{data.email}</b>
      </p>
    </Wrapper>
  )
}
