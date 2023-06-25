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
      aliases: [
        {
          name: "unfold_more",
          to: "fa-solid fa-sort",
        },
        {
          name: "mi-expand_less",
          to: "fa-solid fa-chevron-up",
        },
        {
          name: "mi-expand_more",
          to: "fa-solid fa-chevron-down",
        },
        {
          name: "mi-check",
          to: "fa-solid fa-check",
        },
        {
          name: "mi-warning",
          to: "fa-solid fa-triangle-exclamation",
        },
        {
          name: "remove",
          to: "fa-solid fa-minus",
        },
        {
          name: "mi-highlight_off",
          to: "fa-solid fa-circle-xmark",
        },
        {
          name: "mi-calendar_today",
          to: "fa-regular fa-calendar"
        },
        {
          name: "mi-chevron_left",
          to: "fa-solid fa-chevron-left"
        },
        {
          name: "mi-chevron_right",
          to: "fa-solid fa-chevron-right"
        }
      ],
      fonts: [
        {
          name: '{code}',
          resolve: ({ code }) => ({
            class: '',
            content: '',
            attrs: { icon: `${code}` },
            tag: 'fa-icon'
          })
        }
      ]
    })
  }
})
