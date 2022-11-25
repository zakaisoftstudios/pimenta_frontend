import React from 'react'
import { errorFromFormik } from '../../services/util/form'
import Select from '../molecules/QualitiesSelect'
import PropTypes from 'prop-types'
import SubHeading from '../atoms/SubHeading'
import styled from 'styled-components'
import FormField from '../molecules/FormField'
import SelectMulti from '../atoms/SelectMulti'
import FormRow from '../atoms/FormRow'
import SelectHasMany from '../atoms/SelectHasMany'
import _ from 'lodash'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class QualitiesForm extends React.Component {
  qualityDefinitions = [
    {
      title: this.props.i18n._(t`Skills`),
      options: 'allSkills',
      fieldName: `${this.props.ownerName}_skills_attributes`,
      initialFieldName: `${this.props.ownerName}_skills`,
      key: 'skill',
      pluralKey: 'skills'
    },
    {
      title: this.props.i18n._(t`Interests`),
      options: 'allInterests',
      fieldName: `${this.props.ownerName}_interests_attributes`,
      initialFieldName: `${this.props.ownerName}_interests`,
      key: 'interest',
      pluralKey: 'interests'
    },
    {
      title: this.props.i18n._(t`Strengths`),
      options: 'allStrengths',
      fieldName: `${this.props.ownerName}_strengths_attributes`,
      initialFieldName: `${this.props.ownerName}_strengths`,
      key: 'strength',
      pluralKey: 'strengths'
    }
  ]

  componentDidMount() {
    const { setFieldValue, formikValues } = this.props

    this.qualityDefinitions.forEach(
      ({ initialFieldName, pluralKey, fieldName }) => {
        setFieldValue(
          `${pluralKey}MustHave`,
          this.filterMustHave(formikValues[initialFieldName], true)
        )

        setFieldValue(fieldName, formikValues[initialFieldName])
      }
    )
  }

  filterMustHave = (qualities, shouldMustHave) =>
    qualities
      ? qualities.filter(quality => quality.must_have === shouldMustHave)
      : []

  getDisabledOptions = (qualities, shouldMustHave, optionItemName) =>
    qualities
      ? this.filterMustHave(qualities, !shouldMustHave)
          .filter(quality => !quality._destroy)
          .map(quality => ({
            id: quality[`${optionItemName}_id`] || quality[optionItemName].id
          }))
      : []

  setFieldTouched = yupFieldName => () => {
    this.props.setFieldTouched(yupFieldName)
  }

  selects = () => {
    const { allSkills, allInterests, formikValues, i18n } = this.props

    return this.qualityDefinitions.reduce(
      (
        selects,
        { title, options, fieldName, key, pluralKey, initialFieldName }
      ) => {
        const newSelects = [true, false].map(mustHave => {
          const yupFieldName = `${pluralKey}${
            mustHave ? 'MustHave' : 'CanHave'
          }`

          const type = mustHave ? i18n._(t`(must have)`) : i18n._(t`(can have)`)

          return {
            title: `${title} ${type}`,
            options: this.props[options],
            fieldName,
            yupFieldName,
            optionItemName: key,
            initialValues: this.filterMustHave(
              formikValues[initialFieldName],
              mustHave
            ),
            disabledOptions: this.getDisabledOptions(
              formikValues[fieldName],
              mustHave,
              key
            ),
            mustHave
          }
        })

        return [...selects, ...newSelects]
      },
      []
    )
  }

  handleChange = (mustHave, yupFieldName) => (fieldName, newQualities) => {
    const { setFieldValue } = this.props
    const currentQualities = this.props.formikValues[fieldName]
    const unchangedQualities = this.filterMustHave(currentQualities, !mustHave)
    const newValues = [...unchangedQualities, ...newQualities]
    const qualitiesForValidation = newValues.filter(
      newValue => !newValue._destroy && newValue.must_have === mustHave
    )

    setFieldValue(fieldName, newValues)
    setFieldValue(yupFieldName, qualitiesForValidation)
  }

  render() {
    const {
      ownerId,
      ownerName,
      setFieldTouched,
      setFieldValue,
      errors,
      touched,
      i18n
    } = this.props

    return (
      <React.Fragment>
        {this.selects().map(
          (
            {
              title,
              options,
              fieldName,
              optionItemName,
              initialValues,
              mustHave,
              disabledOptions,
              yupFieldName
            },
            i
          ) => {
            return (
              <React.Fragment key={i}>
                <SubHeading>{title}</SubHeading>
                <FormRow>
                  <SelectHasMany
                    options={options}
                    disabledOptions={disabledOptions}
                    fieldName={fieldName}
                    optionItemName={optionItemName}
                    ownerName={ownerName}
                    ownerId={ownerId}
                    initialValues={initialValues}
                    additionalFields={{ must_have: mustHave }}
                    setFieldValue={this.handleChange(mustHave, yupFieldName)}
                    setFieldTouched={this.setFieldTouched(yupFieldName)}
                    itemToString={item => item.label}
                    limit={5}
                    label={i18n._(t`(Choose up to 5)`)}
                    error={errorFromFormik(errors, touched, yupFieldName)}
                  />
                </FormRow>
              </React.Fragment>
            )
          }
        )}
      </React.Fragment>
    )
  }
}

const Wrapper = styled.div`
  margin-bottom: 5rem;
`

export default withI18n()(QualitiesForm)
