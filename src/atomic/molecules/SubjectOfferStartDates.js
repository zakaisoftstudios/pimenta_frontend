import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from '../molecules/DatePicker'
import FormField from '../molecules/FormField'
import FormRow from '../atoms/FormRow'
import ButtonPlus from '../atoms/ButtonPlus';
import trashIcon from '../../assets/icons/trash.svg';
import useForceUpdate from '../../services/hooks/useForceUpdate';
import { t } from '@lingui/macro'

function SubjectOfferCardActions(
  {
    i18n,
    startingDates,
    setFieldValue
  }) {
    const [dates, setDates] = useState(startingDates != null && startingDates.length < 1 ? [null] : startingDates);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
      handleFormField();
    }, [dates])

    const handleFormField = () => {
      setFieldValue('start_dates',
      dates,
      true)
    }

    function handleAddStartDateClick() {
      dates.push(null);
      setDates(dates);
      forceUpdate();
    }

    function handleRemoveStartDateClick(date) {
      removeElementFromDates(date);
      forceUpdate();
    }

    const removeElementFromDates = async (date) => {
      var allDates = dates;
      const index = await allDates.indexOf(date);

      if (index > -1) {
        allDates.splice(index, 1);
        await setDates(null);
        await setDates(allDates);
      }
    }

    const handleChangeStartDate = (ev, index) => {
      var t = dates;
      t[index] = ev;
      setDates(dates);
    }

    return <>
            {dates && dates.map((date, index) =>
              <FormRow>
                <FormField
                  name={`start_date_${index}`}
                  value={date}
                  component={DatePicker}
                  label={i18n._(t`Starting date`)}
                  custom
                  placeholder="mm/dd/yyyy"
                  withMargin
                  handleChange={(ev) => handleChangeStartDate(ev, index)}
                />
                { index === 0 ? (
                  <ButtonPlus handleClick={handleAddStartDateClick} />
                ) : (
                  <WrapperTrash>
                    <TrashIcon src={trashIcon} onClick={() => handleRemoveStartDateClick(date)} />
                  </WrapperTrash>
                )}
              </FormRow>
            )}
          </>
  }

const WrapperTrash = styled.div`
  padding: 1rem 1rem;
  width: 5rem;
  height: 4.5rem;
  border-radius: 5rem;
  border-width: 0;
  margin-left: -5px;
`

const TrashIcon = styled.img`
  width: 1.8rem;
  height: 1.9rem;
  cursor: pointer;
  margin-top: auto;
  margin-left: 0.4rem;
`

export default SubjectOfferCardActions
