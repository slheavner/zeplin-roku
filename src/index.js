/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */
const utils = require('./utils')
const NEWLINE_REGEX = /[\n\r]/g

function layer(context, selectedLayer) {
  const { type, rect, content, name, fills } = selectedLayer
  let parent = selectedLayer.parent
  if (context.getOption('useRealXY')) {
    while (parent) {
      rect.x += parent.rect.x
      rect.y += parent.rect.y
      parent = parent.parent
    }
  }
  const color = utils.formatColor(context, getColorFromFills(fills))
  const components = utils.getComponentNames(context)
  const fields = {
    id: name.replace(/ /g, '_'),
    width: rect.width,
    height: rect.height,
    translation: `[${rect.x}, ${rect.y}]`,
  }
  if (type === 'text') {
    fields.text = content.replace(NEWLINE_REGEX, '&#xA;')
    return utils.createElement(context, 'label', fields)
  } else if (type === 'shape') {
    if (
      selectedLayer.borderRadius != 0 &&
      context.getOption('use9PatchForRadius')
    ) {
      fields.uri = utils.formatRadiusUri(context, selectedLayer.borderRadius)
      fields.blendColor = color
      return utils.createElement(context, 'poster', fields)
    } else {
      fields.color = color
      return utils.createElement(context, 'rectangle', fields)
    }
  } else {
    if (selectedLayer.exportable) {
      fields.uri = context.getOption('imageUriPlaceholder')
      return utils.createElement(context, 'poster', fields)
    }
  }
}

function getColorFromFills(fills) {
  const WHITE = {
    r: 'FF',
    g: 'FF',
    b: 'FF',
    a: 'FF',
  }
  const colors = fills.map((f) => {
    if (f.color) {
      return f.color.toHex()
    } else {
      return WHITE
    }
  })
  return colors.length > 0 ? colors[0] : WHITE
}

function screen(context, selectedVersion, selectedScreen) {}

function component(context, selectedVersion, selectedComponent) {}

function colors(context) {
  const colors = context.project.colors.map((c) => {
    const hex = c.toHex()
    const value = `0x${hex.r}${hex.g}${hex.b}${hex.a}`
    return `${c.name.replace(/ /g, '_')}: "${value}"`
  })
  return {
    language: 'javascript',
    code: `
function projectColors() as object
    return {
        ${colors.join('\n        ')}
    }
end function
        `,
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function textStyles(context) {
  const components = utils.getComponentNames(context)
  const styles = context.project.textStyles.map((f) => {
    const { fontFamily, fontSize, weightText, fontStyle } = f
    const name = `${fontFamily}-${capitalize(weightText)}${
      fontStyle === 'normal' ? '' : capitalize(fontStyle)
    }`
    const id = `${fontFamily}${capitalize(weightText)}${
      fontStyle === 'normal' ? '' : capitalize(fontStyle)
    }${fontSize}`
    const fields = {
      id: id,
      uri: utils.formatFontPath(context, name),
      size: fontSize,
    }
    const element = utils.createElement(context, 'font', fields)
    return {
      ...element,
      id: id,
    }
  })
  const map = {}
  styles.forEach((element) => {
    map[element.id] = element.code
  })
  return { language: 'xml', code: Object.values(map).join('\n\n') }
}

function spacing(context) {}

function exportColors(context) {}

function exportTextStyles(context) {}

function exportSpacing(context) {}

/**
 * The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
 * See Zeplin Extensions migration guide for details:
 * https://zpl.io/shared-styleguides-extensions-migration-guide
 */

function styleguideColors(context, colors) {}

function styleguideTextStyles(context, textStyles) {}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {}

function comment(context, text) {}

export default {
  layer,
  screen,
  component,
  colors,
  textStyles,
  spacing,
  exportColors,
  exportTextStyles,
  exportSpacing,
  styleguideColors,
  styleguideTextStyles,
  exportStyleguideColors,
  exportStyleguideTextStyles,
  comment,
}
