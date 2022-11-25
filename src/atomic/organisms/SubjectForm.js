import React from 'react'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import styled from 'styled-components'
import ReturnButton from '../molecules/ReturnButton'
import ResponsiveColumn from '../atoms/ResponsiveColumn'
import Input from '../atoms/Input'
import FormField from '../molecules/FormField'
import SubjectOfferStartDates from '../molecules/SubjectOfferStartDates'
import FormRow from '../atoms/FormRow'
import SubHeading from '../atoms/SubHeading'
import TextArea from '../atoms/TextArea'
import GeocodedAddressContainer from '../../containers/GeocodedAddress'
import { subjectOfferStates } from '../../constants/subjectOfferStates'
import GalleryForm from '../molecules/GalleryForm'
import Label from '../atoms/Label'
import DatePicker from '../molecules/DatePicker'
import { errorFromFormik } from '../../services/util/form'
import { breakpoints } from '../../constants/responsive'
import typesOfDegree from '../../constants/typesOfDegree'
import Switch from '@material-ui/core/Switch'
import ButtonRounded from '../atoms/ButtonRounded'
import SelectSimple from '../atoms/SelectSimple'
import Sticky from '../atoms/Sticky'
import minimumDegrees from '../../constants/minimumDegrees'
import subjectCostPeriods from '../../constants/subjectCostPeriods'
import QualitiesForm from './QualitiesForm'
import {
  floatNumberFormatter,
  positiveIntegerFormatter
} from '../../services/inputFormatters'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const SubjectForm = ({
  skills,
  strengths,
  interests,
  handleSubmit,
  submitForm,
  isSubmitting,
  handleCancel,
  errors,
  touched,
  values,
  setFieldTouched,
  setFieldValue,
  setValues,
  handleShowImageUploader,
  handleDeleteAttachment,
  handleShowVideoUploader,
  attachments,
  dirty,
  done,
  i18n
}) => (
  <SectionBox>
    <Form onSubmit={handleSubmit}>
      <Sticky>
        <StyledReturnButton
          mainAction={{ text: i18n._(t`Save and Return`), handler: submitForm }}
          extraAction={{
            text: i18n._(t`Cancel`),
            handler: handleCancel(dirty)
          }}
        />
      </Sticky>

      <Heading>
        <Trans>Subject Offers</Trans>
      </Heading>

      <Columns>
        <ResponsiveColumn>
          <PublishWrapper>
            <StyledSubHeading>
              <Trans>Published</Trans>
            </StyledSubHeading>

            <Switch
              checked={values.state === subjectOfferStates.PUBLISHED}
              onChange={(_, checked) =>
                setFieldValue(
                  'state',
                  checked
                    ? subjectOfferStates.PUBLISHED
                    : subjectOfferStates.UNPUBLISHED
                )
              }
              color="primary"
            />
          </PublishWrapper>

          <FormRow>
            <FormField
              name="name"
              component={Input}
              label={i18n._(t`Name of the class`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="type_of_degree"
              component={SelectSimple}
              label={i18n._(t`Type of degree`)}
              options={typesOfDegree}
              custom
            />
          </FormRow>

          <GeocodedAddressContainer setFieldValue={setFieldValue} />

          <FormRow>
            <FormField
              component={Input}
              name="country"
              label={i18n._(t`Country`)}
              readOnly
            />
          </FormRow>

          <FormRow>
            <FormField
              component={Input}
              name="city"
              label={i18n._(t`City`)}
              readOnly
            />
          </FormRow>

          <FormRow>
            <FormField
              name="postal_code"
              label={i18n._(t`Zip code`)}
              readOnly
              component={Input}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="street"
              component={Input}
              label={i18n._(t`Address (street and number)`)}
            />
          </FormRow>

          <SubjectOfferStartDates
            startingDates={values.start_dates}
            i18n={i18n}
            placeholder="mm/dd/yyyy"
            setFieldValue={setFieldValue}
            formikValues={values}
          />

          <FormRow>
            <FormField
              name="duration_in_hours"
              type="text"
              label={i18n._(t`Duration in hours`)}
              formatOptions={positiveIntegerFormatter}
              component={Input}
            />
          </FormRow>

          <Label>Cost</Label>
          <FormRow>
            <FormField
              name="cost_period"
              component={SelectSimple}
              label={i18n._(t`Period`)}
              options={subjectCostPeriods}
              custom
              withMargin
            />

            <FormField
              type="text"
              name="cost_amount"
              label={i18n._(t`Value (EUR)`)}
              component={Input}
              formatOptions={floatNumberFormatter}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="hours_of_classes_per_week"
              type="text"
              label={i18n._(t`Hours per week`)}
              component={Input}
              formatOptions={positiveIntegerFormatter}
              withMargin
            />

            <FormField
              name="number_of_places"
              type="text"
              formatOptions={positiveIntegerFormatter}
              label={i18n._(t`Number of places`)}
              component={Input}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="nummerus_clausus"
              type="text"
              label={i18n._(t`Numerus Clausus (from 0.0 to 15.0)`)}
              formatOptions={floatNumberFormatter}
              component={Input}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="minimum_degree"
              label={i18n._(t`Minimum Degree`)}
              component={SelectSimple}
              options={minimumDegrees}
              custom
            />
          </FormRow>

          <FormRow>
            <FormField
              name="web_site_link"
              type="text"
              label={i18n._(t`Link to Website`)}
              component={Input}
            />
          </FormRow>
        </ResponsiveColumn>

        <ResponsiveColumn>
          <FormRow>
            <FormField
              name="content"
              component={TextArea}
              label={i18n._(t`Content`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="perspectives"
              component={TextArea}
              label={i18n._(t`Perspectives`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="tests"
              component={TextArea}
              label={i18n._(t`Tests`)}
            />
          </FormRow>

          <QualitiesForm
            ownerId={values.id}
            ownerName="subject_offer"
            formikValues={values}
            allSkills={skills}
            allInterests={interests}
            allStrengths={strengths}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />
        </ResponsiveColumn>

        <GalleryColumn noMargin>
          <GalleryForm
            attachments={attachments}
            handleShowImageUploader={handleShowImageUploader}
            handleDeleteAttachment={handleDeleteAttachment}
            handleShowVideoUploader={handleShowVideoUploader}
            type="subjectOffer"
          />
        </GalleryColumn>
      </Columns>
      <ButtonBar>
        <ButtonRounded handleClick={handleCancel(dirty)} ghost>
          <Trans>Cancel</Trans>
        </ButtonRounded>
        <SaveButton handleClick={submitForm}>
          <Trans>Save</Trans>
        </SaveButton>
      </ButtonBar>
    </Form>
  </SectionBox>
)

const ButtonBar = styled.div`
  display: flex;
  padding: 2.4rem;
  justify-content: flex-end;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

const SaveButton = styled(ButtonRounded)`
  margin: 1.8rem 0 0 0;
  @media (min-width: ${breakpoints.sm}) {
    margin: 0 0 0 1.2rem;
  }
`

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

const GalleryColumn = styled(ResponsiveColumn)`
  width: 30rem;
  flex: none;
`

const StyledReturnButton = styled(ReturnButton)`
  margin-bottom: 2.5rem;
`

const PublishWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.8rem;
`

const StyledSubHeading = styled(SubHeading)`
  padding-top: 6px;
`

export default withI18n()(SubjectForm)
