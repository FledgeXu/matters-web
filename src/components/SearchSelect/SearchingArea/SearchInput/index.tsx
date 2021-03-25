import { useContext } from 'react'

import { IconClear16, IconSearch16, LanguageContext } from '~/components'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

export type SearchType = 'Article' | 'Tag' | 'User'

interface SearchInputProps {
  type: SearchType
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  onFocus: () => void
  onBlur: () => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  type,
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
}) => {
  const { lang } = useContext(LanguageContext)
  const textAriaLabel = translate({ id: 'search', lang })
  const textPlaceholder = {
    Article: translate({
      zh_hant: '搜尋作品標題…',
      zh_hans: '搜索作品标题…',
      en: 'Search articles...',
      lang,
    }),
    Tag: translate({
      zh_hant: '搜尋標籤…',
      zh_hans: '搜索标签…',
      en: 'Search tags...',
      lang,
    }),
    User: translate({
      zh_hant: '搜尋作者…',
      zh_hans: '搜索作者…',
      en: 'Search authors...',
      lang,
    }),
  }

  return (
    <section>
      <form
        onSubmit={(e) => {
          onSubmit(value)
          e.preventDefault()
        }}
        autoComplete="off"
      >
        <input
          type="search"
          name="q"
          value={value}
          aria-label={textAriaLabel}
          placeholder={textPlaceholder[type]}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          onFocus={() => {
            onFocus()
          }}
          onBlur={() => {
            onBlur()
          }}
        />

        <button
          className="search"
          type="submit"
          aria-label={TEXT.zh_hant.search}
        >
          <IconSearch16 color="grey" />
        </button>

        {value && (
          <button
            className="clear"
            type="button"
            aria-label={TEXT.zh_hant.clear}
            onClick={() => onChange('')}
          >
            <IconClear16 color="grey" />
          </button>
        )}
      </form>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SearchInput
