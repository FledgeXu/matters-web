import { useRef } from 'react'

import { Button, CopyToClipboard, IconCopy16 } from '~/components'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const inputRef: React.RefObject<any> | null = useRef(null)

  return (
    <section className="copy">
      <CopyToClipboard text={link}>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="grey-lighter"
          aira-label={TEXT.zh_hant.copy}
        >
          <IconCopy16 color="grey" />
        </Button>
      </CopyToClipboard>

      <CopyToClipboard text={link}>
        <input ref={inputRef} type="text" value={link} readOnly />
      </CopyToClipboard>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
