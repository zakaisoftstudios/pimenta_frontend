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
import ProfileGalleryForm from '../molecules/GalleryForm'
import { positiveIntegerFormatter } from '../../services/inputFormatters'
import { breakpoints } from '../../constants/responsive'
import { Prompt } from 'react-router-dom'
import ButtonRounded from '../atoms/ButtonRounded'
import SelectSimple from '../atoms/SelectSimple'
import types_of_university from '../../constants/types_of_university'
import Sticky from '../atoms/Sticky'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const UniversityProfileForm = ({
  handleSubmit,
  submitForm,
  setFieldValue,
  handleCancel,
  handleShowImageUploader,
  handleDeleteAttachment,
  handleShowVideoUploader,
  attachments,
  dirty,
  done,
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
                  text: i18n._(t`Save and return`),
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
                label={i18n._(t`Name of the University`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="type_of_university"
                component={SelectSimple}
                custom
                options={types_of_university}
                label={i18n._(t`Type of University`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="number_of_students"
                type="text"
                onkeypress="return event.charCode >= 48"
                component={Input}
                label={i18n._(t`Number of students`)}
                formatOptions={positiveIntegerFormatter}
              />
            </FormRow>

            <Heading>About</Heading>

            <FormRow>
              <FormField
                name="we_are"
                component={TextArea}
                label={i18n._(t`We are`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="why_should_you_study_here"
                component={TextArea}
                label={i18n._(t`Why should you study here`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="subject_areas"
                component={TextArea}
                label={i18n._(t`Subject areas`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="special_features"
                component={TextArea}
                label={i18n._(t`Special features & Partners of the university`)}
              />
            </FormRow>

            <Heading>
              <Trans>Be in touch</Trans>
            </Heading>
            <SubHeading largeMarginBottom>
              <Trans>Address</Trans>
            </SubHeading>

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

            <SubHeading largeMarginBottom>
              <Trans>Links</Trans>
            </SubHeading>

            <FormRow>
              <FormField
                name="home_page"
                label={i18n._(t`Website`)}
                type="text"
                component={Input}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="contact_email"
                label={i18n._(t`Contact Email`)}
                type="email"
                component={Input}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="facebok_link"
                label="Facebook"
                component={Input}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="youtube_link"
                label="Youtube"
                component={Input}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="twitter_link"
                label="Twitter"
                component={Input}
              />
            </FormRow>
          </ResponsiveColumn>

          <GalleryColumn noMargin>
            <ProfileGalleryForm
              attachments={attachments}
              handleShowImageUploader={handleShowImageUploader}
              handleDeleteAttachment={handleDeleteAttachment}
              handleShowVideoUploader={handleShowVideoUploader}
              type="company"
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

const GalleryColumn = styled(ResponsiveColumn)`
  padding-top: 5rem;
  width: 30rem;
  flex: none;
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

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

export default withI18n()(UniversityProfileForm)
