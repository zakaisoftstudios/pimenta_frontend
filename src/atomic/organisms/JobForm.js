import React from 'react'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import styled from 'styled-components'
import ReturnButton from '../molecules/ReturnButton'
import ResponsiveColumn from '../atoms/ResponsiveColumn'
import Input from '../atoms/Input'
import FormField from '../molecules/FormField'
import FormRow from '../atoms/FormRow'
import SubHeading from '../atoms/SubHeading'
import TextArea from '../atoms/TextArea'
import GeocodedAddressContainer from '../../containers/GeocodedAddress'
import { jobOfferStates } from '../../constants/jobOfferStates'
import GalleryForm from '../molecules/GalleryForm'
import wagePeriods from '../../constants/wagePeriods'
import jobOfferCategories from '../../constants/jobOfferCategories'
import Label from '../atoms/Label'
import DatePicker from '../molecules/DatePicker'
import { breakpoints } from '../../constants/responsive'
import minimumDegrees from '../../constants/minimumDegrees'
import Switch from '@material-ui/core/Switch'
import ButtonRounded from '../atoms/ButtonRounded'
import SelectSimple from '../atoms/SelectSimple'
import Sticky from '../atoms/Sticky'
import { floatNumberFormatter } from '../../services/inputFormatters'
import QualitiesForm from './QualitiesForm'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const JobForm = ({
  handleSubmit,
  submitForm,
  handleCancel,
  errors,
  touched,
  values,
  setFieldTouched,
  setFieldValue,
  handleShowImageUploader,
  handleDeleteAttachment,
  handleShowVideoUploader,
  attachments,
  skills,
  strengths,
  interests,
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
        <Trans>Job Offers</Trans>
      </Heading>

      <Columns>
        <ResponsiveColumn>
          <PublishWrapper>
            <StyledSubHeading>
              <Trans>Published</Trans>
            </StyledSubHeading>

            <Switch
              checked={values.state === jobOfferStates.PUBLISHED}
              onChange={(_, checked) =>
                setFieldValue(
                  'state',
                  checked
                    ? jobOfferStates.PUBLISHED
                    : jobOfferStates.UNPUBLISHED
                )
              }
              color="primary"
            />
          </PublishWrapper>

          <FormRow>
            <FormField
              name="content"
              component={Input}
              label={i18n._(t`Job Title`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="category"
              component={SelectSimple}
              label={i18n._(t`Role`)}
              options={jobOfferCategories}
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

          <FormRow>
            <FormField
              name="start"
              value={values.start}
              component={DatePicker}
              label={i18n._(t`Starting date (mm/dd/yyyy)`)}
              custom
              placeholder="mm/dd/yyyy"
              withMargin
            />

            <FormField
              name="end_date"
              value={values.end_date}
              component={DatePicker}
              label={i18n._(t`Ending date (mm/dd/yyyy)`)}
              custom
              placeholder="mm/dd/yyyy"
              withMargin
            />
          </FormRow>

          <Label>
            <Trans>Wage</Trans>
          </Label>
          <FormRow>
            <FormField
              name="wage_period"
              component={SelectSimple}
              label={i18n._(t`Period`)}
              options={wagePeriods}
              custom
              withMargin
            />

            <FormField
              withMargin
              type="text"
              name="wage"
              label={i18n._(t`Value (EUR)`)}
              component={Input}
              formatOptions={floatNumberFormatter}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="working_hours_per_week"
              type="text"
              label={i18n._(t`Working hours per week`)}
              component={Input}
              formatOptions={floatNumberFormatter}
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
              name="what_is_expected_from_us"
              component={TextArea}
              label={i18n._(t`What is expected from us`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="what_is_expected_from_you"
              component={TextArea}
              label={i18n._(t`What is expected from you`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="tasks"
              component={TextArea}
              label={i18n._(t`Tasks`)}
            />
          </FormRow>

          <FormRow>
            <FormField
              name="perspectives"
              component={TextArea}
              label={i18n._(t`Perspectives`)}
            />
          </FormRow>

          <QualitiesForm
            ownerId={values.id}
            ownerName="job_offer"
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
            type="jobOffer"
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

export default withI18n()(JobForm)
