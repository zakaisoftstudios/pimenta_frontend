import React from 'react'

import styled from 'styled-components'
import ErrorMessage from '../atoms/ErrorMessage'
import PropTypes from 'prop-types'
import Label from '../atoms/Label'
import { DatePickerInput, DatePicker as RcDatePicker } from 'rc-datepicker'
import Input from '../atoms/Input'
import 'rc-datepicker/lib/style.css'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import dayjs from 'dayjs'
import { dateFormatter } from '../../services/inputFormatters/index'

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.calendarRef = React.createRef()
    this.inputRef = React.createRef()
  }

  state = {
    showCalendar: false,
    inputValue: '',
    calendarValue: null
  }

  componentDidMount() {
    const { value } = this.props
    const inputValue = this.formatDate(value)
    this.setState({ inputValue, calendarValue: value })
  }

  showCalendar = showCalendar => this.setState({ showCalendar })

  formatDate = date =>
    !date || date.length === 0 ? '' : dayjs(date).format('MM/DD/YYYY')

  handleCalendarChange = (jsDate, dateString) => {
    this.showCalendar(false)

    const { i18n, handleChange } = this.props
    const inputValue = this.formatDate(jsDate)
    const formValue = dayjs(jsDate).toISOString()

    this.setState({ inputValue, calendarValue: inputValue })
    handleChange(formValue)
  }

  handleInputChange = e => {
    const inputValue = e.target.value
    const jsDate = dayjs(inputValue)

    this.setState({ inputValue })

    if (jsDate.isValid()) {
      const formValue = jsDate.toISOString()

      this.setState({ calendarValue: formValue })
      this.props.handleChange(formValue)
    } else {
      this.props.handleChange('')
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOnWindow, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOnWindow, false)
  }

  handleClickOnWindow = e => {
    if (
      !this.state.showCalendar ||
      this.calendarRef.current.contains(e.target) ||
      this.inputRef.current.contains(e.target)
    )
      return

    this.showCalendar(false)
  }

  render() {
    const {
      name,
      error,
      value,
      handleChange,
      handleBlur,
      placeholder,
      label = null,
      withMargin = false
    } = this.props

    const { inputValue, calendarValue, showCalendar } = this.state

    return (
      <Wrapper withMargin={withMargin}>
        {label && <Label>{label}</Label>}

        <div ref={this.inputRef}>
          <Input
            name={name}
            value={inputValue}
            error={error}
            handleFocus={() => this.showCalendar(true)}
            handleBlur={handleBlur}
            handleChange={this.handleInputChange}
            // formatOptions={dateFormatter}
          />
        </div>

        {showCalendar && (
          <DatePickerWrapper ref={this.calendarRef}>
            <RcDatePicker
              onChange={this.handleCalendarChange}
              value={calendarValue}
            />
          </DatePickerWrapper>
        )}
      </Wrapper>
    )
  }
}

const DatePickerWrapper = styled.div`
  position: absolute;
  top: calc(100% - 1.5rem);
  left: 0;
  z-index: 900;
`

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-right: ${({ withMargin }) => withMargin && '2rem'};
`

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  textarea: PropTypes.bool,
  small: PropTypes.bool,
  long: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
}

export default withI18n()(DatePicker)
