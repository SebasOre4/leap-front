import { createI18n } from "vue-i18n";
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    availableLocales: import.meta.env.VITE_SUPPORTED_LOCALES.split(","),
    messages,
});

export default i18n;
