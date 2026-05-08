export const nivoTheme = {
  background: 'transparent',
  textColor:  '#8C8A82',
  fontSize:   11,

  axis: {
    domain: {
      line: { stroke: '#E8E5DC', strokeWidth: 1 }
    },
    ticks: {
      line: { stroke: '#E8E5DC', strokeWidth: 1 },
      text: { fontSize: 11, fill: '#8C8A82' }
    },
    legend: {
      text: { fontSize: 12, fontWeight: '600', fill: '#5C5A54' }
    }
  },

  grid: {
    line: { stroke: '#E8E5DC', strokeWidth: 1 }
  },

  legends: {
    title: { text: { fontSize: 11, fill: '#5C5A54' } },
    text:  { fontSize: 11, fill: '#8C8A82' },
    ticks: {
      line: {},
      text: { fontSize: 10, fill: '#8C8A82' }
    }
  },

  annotations: {
    text: {
      fontSize: 13, fill: '#1A1915',
      outlineWidth: 2, outlineColor: '#FFFFFF', outlineOpacity: 1
    },
    link: {
      stroke: '#D4D0C4', strokeWidth: 1,
      outlineWidth: 2, outlineColor: '#FFFFFF', outlineOpacity: 1
    },
    outline: {
      stroke: '#D4D0C4', strokeWidth: 2,
      outlineWidth: 2, outlineColor: '#FFFFFF', outlineOpacity: 1
    },
    symbol: {
      fill: '#8C8A82',
      outlineWidth: 2, outlineColor: '#FFFFFF', outlineOpacity: 1
    }
  },

  tooltip: {
    container: {
      background: '#FFFFFF',
      color: '#1A1915',
      fontSize: 12,
      borderRadius: 8,
      border: '1.5px solid #E8E5DC',
      boxShadow: '0 4px 16px rgba(26,25,21,0.10)'
    },
    basic:     { whiteSpace: 'pre', display: 'flex', alignItems: 'center' },
    table:     {},
    tableCell: { padding: '3px 5px' }
  }
};

// Pastel green palette for charts
export const chartColors = {
  green:      '#4F7A3F',
  teal:       '#3D7A5C',
  blue:       '#4A7FA5',
  amber:      '#B5860D',
  light:      '#E6F0E1',
};
