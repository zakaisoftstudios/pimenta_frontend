export const APP_READY = 'APP_READY'

export const appReady = (payload, error) => ({
  type: APP_READY,
  payload,
  error
})

