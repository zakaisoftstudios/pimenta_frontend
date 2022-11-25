export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

export const getMimeType = base64Data => {
  const mime = base64Data.split(';').split(':')[1]
  console.log('MIME: ', mime)
  return mime
}
