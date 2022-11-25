import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from '../../constants/colors'
import Button from '../atoms/Button'
import ButtonText from '../atoms/ButtonText'
import ButtonBar from '../molecules/ButtonBar'
import StudentProfileWorkExperience from './WorkExperience'
import Divider from '../atoms/Divider'
import BoxHasMany from '../atoms/BoxHasMany'
import StudentProfileEditNewWorkExperience from './NewWorkExperience'
import SubHeading from '../atoms/SubHeading'
import ItalicText from '../atoms/ItalicText'
import { Trans } from '@lingui/macro'

const StudentProfileEditWorkExperiences = ({
  undestroyedItems,
  handleRemoveItem,
  handleRemoveNewItem,
  showNewForm,
  handleToggleNewForm,
  newItems,
  handleClearNewForm,
  setParentFormFieldValue,
  handleEditItem,
  itemToEdit,
  ...rest
}) => (
  <React.Fragment>
    <SubHeading>
      <Trans>Professional</Trans>
    </SubHeading>

    <BoxHasMany>
      {undestroyedItems.length > 0 ? (
        <List>
          {undestroyedItems.map((entry, i) => (
            <li key={entry.id}>
              <ListItem>
                <StudentProfileWorkExperience workExperience={entry} />

                <Actions>
                  <ButtonText handleClick={handleEditItem(entry)}>
                    <Trans>EDIT</Trans>
                  </ButtonText>

                  <ButtonText
                    handleClick={handleRemoveItem(
                      entry.id,
                      setParentFormFieldValue
                    )}
                  >
                    <Trans>DELETE</Trans>
                  </ButtonText>
                </Actions>
              </ListItem>
              {i !== undestroyedItems.length - 1 && <Divider />}
            </li>
          ))}
        </List>
      ) : (
        <EmptyMessage>
          <Trans>add your work experiences</Trans>
        </EmptyMessage>
      )}

      {newItems.length > 0 ? (
        <React.Fragment>
          <ItalicText>
            <Trans>New work experiences:</Trans>
          </ItalicText>

          <List>
            {newItems.map((entry, i) => (
              <li key={i}>
                <ListItem>
                  <StudentProfileWorkExperience workExperience={entry} />

                  <Actions>
                    <ButtonText handleClick={handleEditItem(entry)}>
                      <Trans>EDIT</Trans>
                    </ButtonText>

                    <ButtonText
                      handleClick={handleRemoveNewItem(
                        i,
                        setParentFormFieldValue
                      )}
                    >
                      <Trans>DELETE</Trans>
                    </ButtonText>
                  </Actions>
                </ListItem>
                {i !== newItems.length - 1 && <Divider />}
              </li>
            ))}
          </List>
        </React.Fragment>
      ) : null}

      {showNewForm ? (
        <StudentProfileEditNewWorkExperience
          handleClearNewForm={handleClearNewForm}
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

const List = styled.ul`
  margin-top: 1rem;
  list-style-type: none;
  padding-left: 0;
`

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Remove = styled.div`
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    color: ${colors.error};
  }
`

StudentProfileEditWorkExperiences.propTypes = {
  undestroyedItems: PropTypes.array.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  handleRemoveNewItem: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  handleToggleNewForm: PropTypes.func.isRequired,
  newItems: PropTypes.array.isRequired,
  handleClearNewForm: PropTypes.func.isRequired,
  setParentFormFieldValue: PropTypes.func.isRequired
}

export default StudentProfileEditWorkExperiences
