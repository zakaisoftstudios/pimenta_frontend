import React from 'react'
import * as UniversityProfileAPI from '../../../services/api/universityProfile'
import UniversityProfile from '../../../atomic/organisms/UniversityProfile'

class UniversityProfileShowContainer extends React.Component {
  state = {
    universityProfile: {},
    ready: false
  }

  async componentDidMount() {
    const universityProfile = await UniversityProfileAPI.get()
    this.setState({ universityProfile, ready: true })
  }

  render() {
    const { universityProfile, ready } = this.state
    return <UniversityProfile profile={universityProfile} ready={ready} />
  }
}

export default UniversityProfileShowContainer
