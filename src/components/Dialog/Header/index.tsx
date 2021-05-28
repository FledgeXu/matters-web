import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'

import { Spacer, Translate } from '~/components'

import { TextId } from '~/common/enums'

import { BackButton, CloseButton, RightButton } from './Button'
import styles from './styles.css'

export interface HeaderProps {
  title: TextId | React.ReactNode
  close?: () => void
  closeTextId?: TextId
  mode?: 'hidden' | 'inner'
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode | string
}

const BaseHeader = ({
  title,
  close,
  closeTextId,
  mode,
  leftButton,
  rightButton,
}: HeaderProps) => {
  const headerClasses = classNames({
    inner: mode === 'inner',
  })

  return (
    <header className={headerClasses}>
      <h1>
        <span id="dialog-title">
          {typeof title === 'string' ? (
            <Translate id={title as TextId} />
          ) : (
            title
          )}
        </span>
      </h1>

      {(leftButton || close) && (
        <section className="left">
          {leftButton ||
            (close ? <CloseButton close={close} textId={closeTextId} /> : null)}
        </section>
      )}

      {rightButton && <section className="right">{rightButton}</section>}

      <style jsx>{styles}</style>
    </header>
  )
}

const Header: React.FC<HeaderProps> & {
  RightButton: typeof RightButton
  BackButton: typeof BackButton
  CloseButton: typeof CloseButton
} = (props) => {
  if (props.mode !== 'hidden') {
    return <BaseHeader {...props} />
  }

  return (
    <>
      <div className="u-sm-up-hide">
        <Spacer size="xloose" />
      </div>

      <VisuallyHidden>
        <BaseHeader {...props} />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </>
  )
}

Header.RightButton = RightButton
Header.BackButton = BackButton
Header.CloseButton = CloseButton

export default Header
