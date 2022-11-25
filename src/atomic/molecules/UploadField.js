import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from '../../constants/colors'
import ErrorMessage from '../atoms/ErrorMessage'
import fontSizes from '../../constants/fontSizes'

const UploadField = ({
  name,
  value,
  askPhrase,
  handleChange,
  handleBlur,
  error,
  showError,
  fileName
}) => (
  <Wrapper>
    <input type="hidden" name={name} value={value || ''} />

    <FileInput
      type="file"
      name={`${name}Input`}
      id={`${name}Input`}
      onChange={handleChange}
    />

    <InputLabel htmlFor={`${name}Input`} onClick={handleBlur}>
      <UploadIcon
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        viewBox="0 0 20 17"
      >
        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
      </UploadIcon>

      <span>{askPhrase}</span>
    </InputLabel>

    <ErrorMessageWrapper
      showError={showError}
      showFileName={fileName && fileName.length > 0}
    >
      {fileName && fileName.length > 0 && <FileName>{fileName}</FileName>}
      <ErrorMessage>{error}</ErrorMessage>
    </ErrorMessageWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const FileInput = styled.input`
  display: none;
`

const InputLabel = styled.label`
  cursor: pointer;
  flex: 0 0 content;
  border: 2px solid ${colors.lightGray};
  color: ${colors.lightGray};
  padding: 5px 10px;
  border-radius: 4px;
`

const UploadIcon = styled.svg`
  margin-right: 1.5rem;
`

const ErrorMessageWrapper = styled.div`
  display: ${({ showError, showFileName }) =>
    showError || showFileName ? 'block' : 'none'};
  margin-top: 0.5rem;
`

const FileName = styled.div`
  color: ${colors.gray}
  fontSize: ${fontSizes.small} 
`

UploadField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  askPhrase: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  fileName: PropTypes.string
}

export default UploadField
