const path = require('path')

function formatColor(context, color) {
  const useHex = context.getOption('colorFormat')
  const prefix = useHex ? '0x' : '#'
  return `${prefix}${color.r}${color.g}${color.b}${color.a}`
}

function formatFontPath(context, id) {
  const root = context.getOption('fontPath')
  return path.join(root, `${id}.ttf`)
}

function formatRadiusUri(context, radius) {
  const root = context.getOption('roundedRectPath')
  return `${root}${radius}px.9.png`
}

function formatId(context, id) {
  const addId = context.getOption('addId')
  return addId ? `id="${id.replace(/ /g, '_')}"` : ''
}

function getComponentNames(context) {
  return {
    rectangle: context.getOption('rectangleName'),
    label: context.getOption('labelName'),
    poster: context.getOption('posterName'),
    font: context.getOption('fontName'),
  }
}

function createElement(context, type, fields) {
  const name = getComponentNames(context)[type]
  const lines = Object.keys(fields)
    .map((key) => {
      if (key === 'id') {
        return formatId(context, fields[key])
      }
      return `${key}="${fields[key]}"`
    })
    .filter((s) => s)
  const end = context.getOption('selfClosingTags') ? '/>' : `>\n</${name}>`
  const code = `<${name} 
  ${lines.join('\n  ')} ${end}`
  return {
    language: 'xml',
    code,
  }
}

export {
  formatColor,
  formatFontPath,
  formatId,
  getComponentNames,
  formatRadiusUri,
  createElement,
}
