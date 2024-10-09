/* eslint-disable no-autofix/unicorn/no-array-push-push, unicorn/no-array-push-push -- Needed for readability */
const properties = [];

// Should be first
properties.push(['all']);

// Content
properties.push([
	'content', 'quotes',
]);

// SVG
properties.push([
	'fill', 'stroke',
]);

// Rarely used but important
properties.push([
	'counter-reset', 'counter-increment',
	'unicode-bidi',
	'direction', 'writing-mode', 'writing-mode', 'text-orientation',
]);

// Positioning
properties.push([
	'position', 'inset',
	'inset-block', 'inset-block-start', 'inset-block-end',
	'inset-inline', 'inset-inline-start', 'inset-inline-end',
	'top', 'right', 'bottom', 'left',
	'z-index',
]);

// Box model
properties.push([
	'display', 'box-sizing', 'vertical-align', 'float', 'clear',
	'visibility',
]);

// Flex
properties.push([
	'flex', 'flex-flow', 'flex-direction', 'flex-wrap',
	'flex-grow', 'flex-shrink', 'flex-basis',
]);

// Grid
properties.push([
	'grid', 'grid-area',
	'grid-template', 'grid-template-areas', 'grid-template-rows', 'grid-template-columns',
	'grid-row', 'grid-row-start', 'grid-row-end',
	'grid-column', 'grid-column-start', 'grid-column-end',
	'grid-auto-rows', 'grid-auto-columns', 'grid-auto-flow',
	'grid-gap', 'grid-row-gap', 'grid-column-gap',
	'gap', 'row-gap', 'column-gap',
]);

// Flex & Grid
properties.push([
	'place-self',
	'justify-content', 'justify-items', 'justify-self',
	'align-content', 'align-items', 'align-self',
	'order',
]);

// Geometry
properties.push([
	'inline-size', 'min-inline-size', 'max-inline-size',
	'block-size', 'min-block-size', 'max-block-size',
	'width', 'min-width', 'max-width',
	'height', 'min-height', 'max-height',
	'aspect-ratio',
	'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
	'margin-block-start', 'margin-block-end', 'margin-inline-start', 'margin-inline-end',
	'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
	'padding-block-start', 'padding-block-end', 'padding-inline-start', 'padding-inline-end',
]);

// Tables
properties.push([
	'table-layout',
	'border-collapse', 'border-spacing',
	'empty-cells', 'caption-side',
]);

// Lists
properties.push([
	'list-style', 'list-style-type', 'list-style-position', 'list-style-image',
]);

// Columns
properties.push([
	'columns',
	'column-gap', 'column-fill', 'column-span', 'column-count', 'column-width',
	'column-rule', 'column-rule-width', 'column-rule-style', 'column-rule-color',
]);

// Text
properties.push([
	'color',
	'font', 'font-display',
	'font-family', 'font-size', 'line-height', 'font-size-adjust',
	'font-style', 'font-weight',
	'font-smoothing', 'font-synthesis',
	'font-kerning', 'font-stretch',
	'font-variant', 'font-variant-caps', 'font-variant-numeric', 'font-variant-position',
	'font-variant-ligatures', 'font-variant-alternates', 'font-variant-east-asian',
	'font-language-override', 'font-feature-settings',
	'letter-spacing',
	'text-align', 'text-align-last',
	'text-indent', 'text-justify',
	'text-transform', 'text-rendering',
	'text-decoration', 'text-decoration-line', 'text-decoration-color', 'text-decoration-style',
	'text-emphasis', 'text-emphasis-color', 'text-emphasis-style', 'text-emphasis-position',
	'text-combine-upright', 'text-underline-position',
	'text-orientation',
	'text-overflow', 'text-shadow',
	'white-space', 'word-spacing',
	'word-wrap', 'word-break',
	'tab-size', 'hyphens',
]);

// Appearance
properties.push([
	'object-fit', 'object-position',
	'background', 'background-color', 'background-image', 'background-repeat',
	'background-position', 'background-position-x', 'background-position-y',
	'background-size', 'background-attachment', 'background-clip', 'background-origin',
	'background-blend-mode',
	'border', 'border-width', 'border-style', 'border-color',
	'border-top', 'border-top-width', 'border-top-style', 'border-top-color',
	'border-right', 'border-right-width', 'border-right-style', 'border-right-color',
	'border-bottom', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
	'border-left', 'border-left-width', 'border-left-style', 'border-left-color',
	'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius',
	'border-image', 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset', 'border-image-repeat',
	'overflow', 'overflow-inline', 'overflow-block', 'overflow-x', 'overflow-y',
	'clip', 'clip-path',
	'box-shadow',
	'filter',
	'opacity',
	'outline', 'outline-width', 'outline-color', 'outline-style', 'outline-offset',
	'appearance',
]);

// Transform
properties.push([
	'transform', 'transform-origin', 'transform-box', 'transform-style', 'transform-function',
	'rotate', 'scale',
	'backface-visibility', 'perspective', 'perspective-origin',
]);

// Transition
properties.push([
	'transition', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay',
]);

// Animation
properties.push([
	'animation', 'animation-name', 'animation-duration', 'animation-timing-function', 'animation-direction', 'animation-delay',
	'animation-iteration-count', 'animation-fill-mode', 'animation-play-state',
]);

// Other
properties.push([
	'will-change', 'cursor', 'user-select', 'resize', 'pointer-events',
]);

// Print
properties.push([
	'break-before', 'break-after', 'break-inside', 'widows', 'orphans',
]);

export default properties.flat();
