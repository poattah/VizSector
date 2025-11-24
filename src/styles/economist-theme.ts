/**
 * The Economist Brand Colors and Design System
 *
 * Based on The Economist's distinctive visual style guide:
 * - Simplicity and clarity
 * - Consistent branding with signature red
 * - Neutral greys and blues for data
 * - Publication-ready aesthetics
 */

export const EconomistColors = {
  // Primary Brand Color
  economistRed: '#E3120B',

  // Neutral Greys (for gridlines, text, backgrounds)
  grey: {
    gridline: '#758D99',
    text: '#22313F',
    light: '#D3D3D3',
    medium: '#999999',
    dark: '#666666',
  },

  // Blues (for data visualization)
  blue: {
    light: '#6794DC',
    medium: '#4472C4',
    dark: '#2E5C8A',
    navy: '#1F4788',
  },

  // Supporting Colors (used sparingly)
  supporting: {
    teal: '#4DB3A2',
    orange: '#DF7C18',
    purple: '#7E4A9E',
    green: '#3D9140',
  },

  // Chart Backgrounds
  background: {
    white: '#FFFFFF',
    lightGrey: '#F5F5F5',
  },
} as const;

/**
 * Economist-style color palettes for charts
 * Using monochromatic and limited color schemes
 */
export const EconomistPalettes = {
  // Single series (shades of blue)
  bluesMonochrome: [
    EconomistColors.blue.dark,
    EconomistColors.blue.medium,
    EconomistColors.blue.light,
    '#89ABE3',
    '#B4C7E7',
  ],

  // Multiple series (carefully selected distinct colors)
  multiSeries: [
    EconomistColors.economistRed,
    EconomistColors.blue.dark,
    EconomistColors.supporting.teal,
    EconomistColors.supporting.orange,
    EconomistColors.grey.dark,
    EconomistColors.supporting.purple,
  ],

  // Neutral (all greys)
  greysMonochrome: [
    EconomistColors.grey.dark,
    EconomistColors.grey.medium,
    EconomistColors.grey.light,
    '#CCCCCC',
    '#E0E0E0',
  ],

  // Diverging (for positive/negative)
  diverging: [
    EconomistColors.economistRed,
    '#FF6B6B',
    EconomistColors.grey.light,
    '#6B9FFF',
    EconomistColors.blue.dark,
  ],

  // Classic Economist (red + blues)
  classicEconomist: [
    EconomistColors.economistRed,
    EconomistColors.blue.dark,
    EconomistColors.blue.medium,
    EconomistColors.blue.light,
    EconomistColors.grey.medium,
  ],
} as const;

/**
 * Typography system matching Economist's editorial standards
 */
export const EconomistTypography = {
  fonts: {
    // Fallback to system sans-serif that resembles Economist Sans
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace',
  },

  sizes: {
    chartTitle: '18px',
    chartSubtitle: '14px',
    axisLabel: '11px',
    dataLabel: '11px',
    source: '10px',
    legend: '11px',
  },

  weights: {
    title: 600,
    subtitle: 400,
    label: 400,
    bold: 700,
  },

  lineHeights: {
    title: 1.3,
    subtitle: 1.4,
    body: 1.5,
  },
} as const;

/**
 * Chart styling constants
 */
export const EconomistChartStyle = {
  // Red top bar
  topBar: {
    height: 4,
    color: EconomistColors.economistRed,
  },

  // Red tag (logo replacement)
  tag: {
    width: 60,
    height: 40,
    color: EconomistColors.economistRed,
    position: 'top-left' as const,
  },

  // Grid styling
  grid: {
    color: EconomistColors.grey.gridline,
    opacity: 0.3,
    strokeDasharray: '0', // Solid lines
  },

  // Data source
  source: {
    opacity: 0.75,
    color: EconomistColors.grey.medium,
    position: 'bottom-left' as const,
  },

  // Margins and spacing
  spacing: {
    top: 60,
    right: 40,
    bottom: 60,
    left: 60,
  },
} as const;

/**
 * Export settings for publication-ready output
 */
export const EconomistExportSettings = {
  // Standard web dimensions
  web: {
    width: 640,
    height: 480,
    dpi: 96,
  },

  // Print quality
  print: {
    width: 1920,
    height: 1440,
    dpi: 300,
  },

  // Social media optimized
  social: {
    width: 1200,
    height: 675,
    dpi: 96,
  },
} as const;
