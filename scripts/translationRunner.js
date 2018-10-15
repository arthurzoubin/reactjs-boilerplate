/*eslint-disable */
import manageTranslations from 'react-intl-translations-manager'
import { SUPPORTED_LOCALE_TAGS } from '../src/config/localisation'

debug('react-intl:translations-manager')(SUPPORTED_LOCALE_TAGS)

manageTranslations({
  messagesDirectory: 'build/messages/',
  translationsDirectory: 'src/locales/',
  whitelistsDirectory: 'src/locales/whitelist',
  languages: SUPPORTED_LOCALE_TAGS,
})
