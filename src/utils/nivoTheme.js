
export const nivoTheme = {

  background: 'transparent',
  textColor:  '#71717a',
  fontSize:   12,

  axis: {
    domain: {
      line: { stroke: '#e4e4e7', strokeWidth: 1 }
    },
    ticks: {
      line: { stroke: '#e4e4e7', strokeWidth: 1 },
      text: { fontSize: 12, fill: '#71717a' }
    },
    legend: {
      text: { fontSize: 13, fontWeight: '600', fill: '#52525b' }
    }
  },

  grid: {
    line: { stroke: '#f4f4f5', strokeWidth: 1 }
  },

  legends: {
    title: { text: { fontSize: 12, fill: '#52525b' } },
    text:  { fontSize: 12, fill: '#71717a' },
    ticks: {
      line: {},
      text: { fontSize: 10, fill: '#71717a' }
    }
  },

  annotations: {
    text: {
      fontSize: 13, fill: '#3f3f46',
      outlineWidth: 2, outlineColor: '#ffffff', outlineOpacity: 1
    },
    link: {
      stroke: '#a1a1aa', strokeWidth: 1,
      outlineWidth: 2, outlineColor: '#ffffff', outlineOpacity: 1
    },
    outline: {
      stroke: '#a1a1aa', strokeWidth: 2,
      outlineWidth: 2, outlineColor: '#ffffff', outlineOpacity: 1
    },
    symbol: {
      fill: '#71717a',
      outlineWidth: 2, outlineColor: '#ffffff', outlineOpacity: 1
    }
  },

  tooltip: {
    container: {
      background: '#ffffff',
      color: '#18181b',
      fontSize: 12,
      borderRadius: 4,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    },
    basic:     { whiteSpace: 'pre', display: 'flex', alignItems: 'center' },
    table:     {},
    tableCell: { padding: '3px 5px' }
  }

};
