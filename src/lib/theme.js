const Color = require('color')

const honeydew = '#E3F9EC'
const lightGray = '#CDD5D1'
const silverChalice = '#B4A6AB'
const etonBlue = '#7FC6A4'
const wenge = '#615055'
const canvasColor = Color(lightGray).lighten(0.2).string()
const antiqueFuchsia = '#b4a6ab'
const azureishWhite = '#ddf8e8'

export default {
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: silverChalice,
    accent1Color: '#9EE493',
    textColor: wenge,
    canvasColor: canvasColor
  }
}
