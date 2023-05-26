import { createVuestic, createIconsConfig } from 'vuestic-ui'

export const vuestic = createVuestic({
  config: {
    colors: {
      variables: {
        // Default colors
        primary: '#8A1207',
        secondary: '#E9540D',
        error: '#C00D0D',
        info: '#2c73ab',
        continue: '#009c8c',
        black: '#282828'
      }
    },
    icons: createIconsConfig({
      fonts: [
        {
          name: '{code}',
          resolve: ({ code }) => ({
            class: '',
            content: '',
            attrs: { icon: code.includes('fa-') ? `${code}` : 'fa-solid fa-shapes' },
            tag: 'fa-icon'
          })
        }
      ]
    })
  }
})
