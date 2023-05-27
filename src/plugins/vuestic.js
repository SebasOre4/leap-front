import { createVuestic, createIconsConfig } from 'vuestic-ui'

export const vuestic = createVuestic({
  config: {
    colors: {
      variables: {
        // Default colors
        primary: '#6022C6',
        secondary: '#8960FC',
        error: '#b3302d',
        info: '#4480ae',
        warning: '#ffc823',
        success: '#5a7152',
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
