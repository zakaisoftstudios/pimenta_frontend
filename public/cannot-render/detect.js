if (isIe()) {
  document.execCommand("Stop");
  var lang = getLang()
  setupElements(lang)
  loadImages(lang)
}

function setupElements(lang) {
  document.getElementById('root').style.display = 'none'
  document.getElementById('ie-warning').style.display = 'block'

  var messageDiv = lang === 'de' ? 'cannot-render-de' : 'cannot-render-en'
  document.getElementById(messageDiv).style.display = 'block'
}

function loadImages(lang) {
  var imgLang = lang === 'de' ? 'de' : 'en'
  var imgs = [
    '.c2su-logo-' + imgLang,
    '.chrome-logo-' + imgLang,
    '.firefox-logo-' + imgLang,
    '.safari-logo-' + imgLang
  ]

  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i]
    var imgElement = document.querySelector(img)
    var src = imgElement.getAttribute('data-src')
    imgElement.src = src
  }  
}

function getLang() {
  return (
    navigator.language ||
    navigator.browserLanguage ||
    (navigator.languages || ['en'])[0]
  )
}

function isIe() {
  var ua = window.navigator.userAgent
  var msie = ua.indexOf('MSIE ')

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true

  return false
}
