import React from 'react'
import styled from 'styled-components'
import ButtonRounded from '../atoms/ButtonRounded'
import { breakpoints } from '../../constants/responsive'
import ErrorMessage from '../atoms/ErrorMessage'

const UploadButton = ({
  name,
  handleChange,
  label,
  value,
  accept = '',
  small = false,
  error = '',
  fileName = null
}) => (
  <Wrapper>
    <input type="hidden" name={name} value={value} />

    <FileInput
      type="file"
      accept={accept}
      name={`${name}Input`}
      id={`${name}Input`}
      onChange={handleChange}
    />

    <ChooseImageButton ghost small={small}>
      <Label htmlFor={`${name}Input`}>{label}</Label>
    </ChooseImageButton>

    {fileName && <FileName>{fileName}</FileName>}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const FileInput = styled.input`
  display: none;
`

const Label = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 1.2rem 2.4rem;
  @media (min-width: ${breakpoints.sm}) {
    padding: 1.2rem 6rem;
  }
`

const ChooseImageButton = styled(ButtonRounded)`
  padding-left: 0;
  padding-right: 0;
  ${({ small }) =>
    small &&
    `
    font-size: 1.5rem;
  `}
`

const FileName = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-align: right;
  width: 100%;
  padding-right: 1rem;
  font-weight: 300;
`

export default UploadButton
