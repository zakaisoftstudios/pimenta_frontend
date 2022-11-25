import React from 'react'
import Heading from '../atoms/Heading'
import styled from 'styled-components'
import ProfileMainInfoForm from '../molecules/ProfileMainInfoForm'
import FullHeightBox from '../atoms/FullHeightBox'
import ReturnButton from '../molecules/ReturnButton'
import ResponsiveColumn from '../atoms/ResponsiveColumn'
import Input from '../atoms/Input'
import FormField from '../molecules/FormField'
import FormRow from '../atoms/FormRow'
import SubHeading from '../atoms/SubHeading'
import TextArea from '../atoms/TextArea'
import GeocodedAddressContainer from '../../containers/GeocodedAddress'
import StudentProfileEditCertificatesContainer from '../../containers/Student/Profile/Edit/Certificates'
import ProfileGalleryForm from '../molecules/GalleryForm'
import { floatNumberFormatter } from '../../services/inputFormatters'
import { breakpoints } from '../../constants/responsive'
import highestGraduationLevels from '../../constants/highestGraduationLevels'
import ButtonRounded from '../atoms/ButtonRounded'
import SelectSimple from '../atoms/SelectSimple'
import currentJobStatuses from '../../constants/currentJobStatuses'
import mobilities from '../../constants/mobilities'
import hasDrivingLicence from '../../constants/hasDrivingLicence'
import InputRadio from '../molecules/InputRadio'
import OptionLabel from '../atoms/OptionLabel'
import SelectHasMany from '../atoms/SelectHasMany'
import EducationEntriesContainer from '../../containers/Student/Profile/Edit/EducationEntries'
import WorkExperiencesContainer from '../../containers/Student/Profile/Edit/WorkExperiences'
import HasManyContainer from '../../containers/Shared/HasManyContainer'
import { errorFromFormik } from '../../services/util/form'
import DatePicker from '../molecules/DatePicker'
import genders from '../../constants/genders'
import Sticky from '../atoms/Sticky'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const StudentProfileForm = ({
  handleSubmit,
  submitForm,
  setFieldValue,
  setFieldTouched,
  handleCancel,
  handleShowImageUploader,
  handleDeleteAttachment,
  handleShowVideoUploader,
  attachments,
  dirty,
  done,
  skills,
  interests,
  strengths,
  errors,
  touched,
  values,
  profile,
  i18n
}) => (
  <Wrapper>
    <ProfileMainInfoForm
      handleShowImageUploader={handleShowImageUploader}
      attachments={attachments}
    />

    <ProfileDetailsForm>
      <Form onSubmit={handleSubmit}>
        <Columns>
          <ResponsiveColumn>
            <Sticky>
              <StyledReturnButton
                mainAction={{
                  text: i18n._(t`Save and Return`),
                  handler: submitForm
                }}
                extraAction={{
                  text: i18n._(t`Cancel`),
                  handler: handleCancel(dirty)
                }}
              />
            </Sticky>

            <FormRow>
              <FormField
                name="name"
                component={Input}
                label={i18n._(t`Name`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="graduation"
                component={Input}
                label={i18n._(t`Speciality`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="current_job_status"
                component={SelectSimple}
                custom
                options={currentJobStatuses}
                label={i18n._(t`Current job status`)}
              />
            </FormRow>

            <Heading>About me</Heading>
            <SubHeading>Details</SubHeading>

            <FormRow>
              <FormField
                name="highest_graduation_level"
                component={SelectSimple}
                custom
                options={highestGraduationLevels}
                label={i18n._(t`Highest graduation level`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="area_of_graduation"
                component={Input}
                label={i18n._(t`Area of graduation`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="grade_point_average"
                component={Input}
                type="text"
                label={i18n._(t`Average grade`)}
                formatOptions={floatNumberFormatter}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="date_of_birth"
                value={values.date_of_birth}
                component={DatePicker}
                label={i18n._(t`Birthday (mm/dd/yyyy)`)}
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
                name="gender"
                component={InputRadio}
                labelText={i18n._(t`Gender`)}
                options={genders}
                labelComponent={inputRadioProps => (
                  <OptionLabel {...inputRadioProps} />
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="mobility"
                component={InputRadio}
                labelText={i18n._(t`Available for mobility`)}
                options={mobilities}
                labelComponent={inputRadioProps => (
                  <OptionLabel {...inputRadioProps} />
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="driving_license"
                component={InputRadio}
                labelText={i18n._(t`Has driver licence`)}
                options={hasDrivingLicence}
                labelComponent={inputRadioProps => (
                  <OptionLabel {...inputRadioProps} />
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="available_from"
                value={values.available_from}
                component={DatePicker}
                label={i18n._(t`Available From (mm/dd/yyyy)`)}
                custom
                placeholder="mm/dd/yyyy"
              />
            </FormRow>

            <SubHeading>Skills</SubHeading>
            <FormRow>
              <SelectHasMany
                options={skills}
                fieldName="student_profile_skills_attributes"
                optionItemName="skill"
                ownerName="student_profile"
                ownerId={values.id}
                initialValues={profile.student_profile_skills}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                itemToString={item => item.label}
                limit={5}
                min={1}
                label={i18n._(t`(Choose up to 5)`)}
                error={errorFromFormik(
                  errors,
                  touched,
                  'student_profile_skills_attributes'
                )}
              />
            </FormRow>

            <SubHeading>
              <Trans>Interests</Trans>
            </SubHeading>
            <FormRow>
              <SelectHasMany
                options={interests}
                fieldName="student_profile_interests_attributes"
                optionItemName="interest"
                ownerName="student_profile"
                ownerId={values.id}
                initialValues={profile.student_profile_interests}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                itemToString={item => item.label}
                limit={5}
                min={1}
                label={i18n._(t`(Choose up to 5)`)}
                error={errorFromFormik(
                  errors,
                  touched,
                  'student_profile_interests_attributes'
                )}
              />
            </FormRow>

            <SubHeading>
              <Trans>Strengths</Trans>
            </SubHeading>
            <FormRow>
              <SelectHasMany
                options={strengths}
                fieldName="student_profile_strengths_attributes"
                optionItemName="strength"
                ownerName="student_profile"
                ownerId={values.id}
                initialValues={profile.student_profile_strengths}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                itemToString={item => item.label}
                limit={5}
                min={1}
                label={i18n._(t`(Choose up to 5)`)}
                error={errorFromFormik(
                  errors,
                  touched,
                  'student_profile_strengths_attributes'
                )}
              />
            </FormRow>

            <SubHeading>
              <Trans>More</Trans>
            </SubHeading>
            <FormRow>
              <FormField
                name="other_skills_and_interests"
                component={TextArea}
                label={i18n._(t`Details`)}
                regularLabel
              />
            </FormRow>

            <Heading>
              <Trans>Experiences</Trans>
            </Heading>

            <StudentProfileEditCertificatesContainer
              certificates={values.certificates}
              setFieldValue={setFieldValue}
              profileId={values.id}
            />

            <HasManyContainer
              items={values.education_entries}
              fieldName="education_entries"
              render={props => (
                <EducationEntriesContainer
                  {...props}
                  setParentFormFieldValue={setFieldValue}
                />
              )}
            />

            <HasManyContainer
              items={values.work_experiences}
              fieldName="work_experiences"
              render={props => (
                <WorkExperiencesContainer
                  {...props}
                  setParentFormFieldValue={setFieldValue}
                />
              )}
            />
          </ResponsiveColumn>

          <GalleryColumn noMargin>
            <ProfileGalleryForm
              attachments={attachments}
              handleShowImageUploader={handleShowImageUploader}
              handleDeleteAttachment={handleDeleteAttachment}
              handleShowVideoUploader={handleShowVideoUploader}
              type="student"
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
    </ProfileDetailsForm>
  </Wrapper>
)

const Wrapper = styled(FullHeightBox)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
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

const StyledReturnButton = styled(ReturnButton)`
  margin-bottom: 3.9rem;
`

const ProfileDetailsForm = styled(FullHeightBox)`
  background: #ffffff;
  flex: 1;
  display: flex;
  padding: 2.4rem;
`

const GalleryColumn = styled(ResponsiveColumn)`
  padding-top: 5rem;
  width: 30rem;
  flex: none;
`

const SaveButton = styled(ButtonRounded)`
  margin: 1.8rem 0 0 0;
  @media (min-width: ${breakpoints.sm}) {
    margin: 0 0 0 1.2rem;
  }
`

const ButtonBar = styled.div`
  display: flex;
  padding: 2.4rem;
  justify-content: flex-end;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

export default withI18n()(StudentProfileForm)
