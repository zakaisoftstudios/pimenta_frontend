import React, { useState, useEffect } from 'react'
import * as AdminDashboardAPI from '../../../services/api/adminDashboard'
import Heading from '../../../atomic/atoms/Heading'
import { Trans } from '@lingui/macro'
import Card from './Card'
import { Wrapper, WrapperCards, WrapperGroupCards } from '../styles'

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await AdminDashboardAPI.get()
    setDashboard(data)
  }

  return (
    <Wrapper>
      <Heading>
        <Trans>Dashboard</Trans>
      </Heading>
      <WrapperCards>
        <WrapperGroupCards className='col-md-6'>
          <Card title='N° of registrated Users'
                quantity={dashboard.users_quantity} />
          <Card title='N° of registrated Students'
                quantity={dashboard.students_quantity}
                percentage={dashboard.students_percentage} />
          <Card title='N° of registrated Universities'
                quantity={dashboard.universities_quantity}
                percentage={dashboard.universities_percentage} />
        </WrapperGroupCards>
        <WrapperGroupCards className='col-md-6'>
          <Card title='N° of registrated Companies'
                quantity={dashboard.companies_quantity}
                percentage={dashboard.companies_percentage} />
          <Card title='N° of registrated Admins'
                quantity={dashboard.admins_quantity}
                percentage={dashboard.admins_percentage} />
          <Card title='N° of registrated Job Offers'
                quantity={dashboard.job_offers_quantity} />
        </WrapperGroupCards>
        <WrapperGroupCards className='col-md-6'>
          <Card title='N° of registrated Subject Offers'
                quantity={dashboard.subject_offers_quantity} />
        </WrapperGroupCards>
      </WrapperCards>
    </Wrapper>
  )
}
