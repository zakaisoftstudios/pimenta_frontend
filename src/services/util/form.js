export const errorFromFormik = (errors, touched, field) =>
  errors[field] && touched[field] ? errors[field] : ''
