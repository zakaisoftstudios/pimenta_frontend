import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from '../../constants/colors'
import Button from '../atoms/Button'
import ButtonBar from '../molecules/ButtonBar'
import StudentProfileEducationEntry from './EducationEntry'
import Divider from '../atoms/Divider'
import BoxHasMany from '../atoms/BoxHasMany'
import StudentProfileEditNewEducationEntry from './NewEducationEntry'
import SubHeading from '../atoms/SubHeading'
import ButtonText from '../atoms/ButtonText'
import ItalicText from '../atoms/ItalicText'
import { Trans } from '@lingui/macro'

const StudentProfileEditEducationEntries = ({
  undestroyedEntries,
  handleRemoveEducation,
  handleRemoveNewEducation,
  showNewForm,
  handleToggleNewForm,
  newEducationEntries,
  handleClearAddEducation,
  setParentFormFieldValue,
  handleEditEducation,
  itemToEdit,
  ...rest
}) => (
  <React.Fragment>
    <SubHeading>
      <Trans>Educational</Trans>
    </SubHeading>

    <BoxHasMany>
      {undestroyedEntries.length > 0 ? (
        <EducationList>
          {undestroyedEntries.map((entry, i) => (
            <li key={entry.id}>
              <EducationListItem>
                <StudentProfileEducationEntry education={entry} />

                <Actions>
                  <ButtonText handleClick={handleEditEducation(entry)}>
                    <Trans>EDIT</Trans>
                  </ButtonText>

                  <ButtonText
                    handleClick={handleRemoveEducation(
                      entry.id,
                      setParentFormFieldValue
                    )}
                  >
                    <Trans>DELETE</Trans>
                  </ButtonText>
                </Actions>
              </EducationListItem>
              {i !== undestroyedEntries.length - 1 && <Divider />}
            </li>
          ))}
        </EducationList>
      ) : (
        <EmptyMessage>
          <Trans>add your educational history</Trans>
        </EmptyMessage>
      )}

      {newEducationEntries.length > 0 ? (
        <React.Fragment>
          <ItalicText>
            <Trans>New education entries:</Trans>
          </ItalicText>

          <EducationList>
            {newEducationEntries.map((entry, i) => (
              <li key={i}>
                <EducationListItem>
                  <StudentProfileEducationEntry education={entry} />

                  <Actions>
                    <ButtonText handleClick={handleEditEducation(entry)}>
                      <Trans>EDIT</Trans>
                    </ButtonText>

                    <ButtonText
                      handleClick={handleRemoveNewEducation(
                        i,
                        setParentFormFieldValue
                      )}
                    >
                      <Trans>DELETE</Trans>
                    </ButtonText>
                  </Actions>
                </EducationListItem>
                {i !== newEducationEntries.length - 1 && <Divider />}
              </li>
            ))}
          </EducationList>
        </React.Fragment>
      ) : null}

      {showNewForm ? (
        <StudentProfileEditNewEducationEntry
          handleClearAddEducation={handleClearAddEducation}
          itemToEdit={itemToEdit}
          {...rest}
        />
      ) : (
        <ButtonBar mini>
          <Button type="button" handleClick={handleToggleNewForm}>
            <Trans>Add</Trans>
          </Button>
        </ButtonBar>
      )}
    </BoxHasMany>
  </React.Fragment>
)

const Actions = styled.div`
  display: flex;
  width: auto;
`

const EmptyMessage = styled.div`
  color: ${colors.lightGray};
  margin: 0.5rem 0;
`

const EducationList = styled.ul`
  margin-top: 1rem;
  list-style-type: none;
  padding-left: 0;
`

const EducationListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

StudentProfileEditEducationEntries.propTypes = {
  undestroyedEntries: PropTypes.array.isRequired,
  handleRemoveEducation: PropTypes.func.isRequired,
  handleRemoveNewEducation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  handleToggleNewForm: PropTypes.func.isRequired,
  newEducationEntries: PropTypes.array.isRequired,
  handleClearAddEducation: PropTypes.func.isRequired,
  setParentFormFieldValue: PropTypes.func.isRequired
}

export default StudentProfileEditEducationEntries
