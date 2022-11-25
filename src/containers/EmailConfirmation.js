import React from 'react'
import EmailConfirmation from '../atomic/molecules/EmailConfirmation'
import { Redirect } from 'react-router-dom'
import * as EmailConfirmationAPI from '../services/api/emailConfirmations'

class EmailConfirmationContainer extends React.Component {
  state = {
    confirmed: true
  }

  async componentDidMount() {
    const confirmToken = this.props.match.params.confirmToken
    const res = await EmailConfirmationAPI.post(confirmToken)
    if (!res.error) {
      this.setState({ confirmed: true })
    }
  }

  render() {
    const { confirmed } = this.state

    return (
      <EmailConfirmation
        confirmed={confirmed}
      />
    )
  }
}

export default EmailConfirmationContainer
