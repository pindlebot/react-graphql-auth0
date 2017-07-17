
var Color = require('color');

var honeydew = '#E3F9EC'
var lightGray = '#CDD5D1'
var silverChalice = '#B4A6AB'
var etonBlue = '#7FC6A4'
var wenge = '#615055'
var canvasColor = Color(lightGray).lighten(0.2).string()
console.log(canvasColor)

export default {
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: silverChalice,
    textColor: wenge,
    canvasColor: canvasColor,
  }
}