import React from 'react'
import * as CompanyProfileAPI from '../../../services/api/companyProfile'
import CompanyProfile from '../../../atomic/organisms/CompanyProfile'

class CompanyProfileShowContainer extends React.Component {
  state = {
    companyProfile: {},
    ready: false
  }

  async componentDidMount() {
    const companyProfile = await CompanyProfileAPI.get()
    this.setState({ companyProfile, ready: true })
  }

  render() {
    const { companyProfile, ready } = this.state
    return <CompanyProfile profile={companyProfile} ready={ready} />
  }
}

export default CompanyProfileShowContainer
