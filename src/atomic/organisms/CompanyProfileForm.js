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
import { breakpoints } from '../../constants/responsive'
import { Prompt } from 'react-router-dom'
import ButtonRounded from '../atoms/ButtonRounded'
import Sticky from '../atoms/Sticky'
import { positiveIntegerFormatter } from '../../services/inputFormatters'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const CompanyProfileForm = ({
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
                label={i18n._(t`Company Name`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="industry_sector"
                component={Input}
                label={i18n._(t`Industry Sector`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="number_of_employees"
                type="text"
                component={Input}
                label={i18n._(t`Number of Employess`)}
                formatOptions={positiveIntegerFormatter}
              />
            </FormRow>

            <Heading>
              <Trans>About us</Trans>
            </Heading>

            <FormRow>
              <FormField
                name="what_we_do"
                component={TextArea}
                label={i18n._(t`What we do`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="why_we_do_it"
                component={TextArea}
                label={i18n._(t`Why we do it`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="why_you_should_join_our_team"
                component={TextArea}
                label={i18n._(t`Why should you join`)}
              />
            </FormRow>

            <FormRow>
              <FormField
                name="special_features"
                component={TextArea}
                label={i18n._(t`Special Features`)}
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

            <FormRow>
              <FormField
                name="instagram_link"
                label="Instagram"
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

export default withI18n()(CompanyProfileForm)
