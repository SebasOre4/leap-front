import { createVuestic, createIconsConfig } from 'vuestic-ui'

export const vuestic = createVuestic({
  config: {
    colors: {
      variables: {
        // Default colors
        primary: '#6022C6',
        secondary: '#8960FC',
        male: '#00a2ff',
        female: '#ec49a5',
        error: '#dc3545',
        blue: '#007bff',
        info: '#17a2b8',
        warning: '#ffc107',
        success: '#28a745',
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
