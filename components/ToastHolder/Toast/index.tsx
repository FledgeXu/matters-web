// External modules
import classNames from 'classnames'
import { useEffect, useState } from 'react'

// Internal modules
import { emitter } from '~/common/services/event'
import { Icon } from '~/components'
import IconCloseWhite from '~/static/icons/close-white.svg'
import IconClose from '~/static/icons/close.svg'
import styles from './styles.css'

/**
 * Toast is a component for presenting pop-up message. Don't manually
 * mount component, use emitter instead.
 *
 * Usage:
 *
 * // To create a toast
 * import { emitter } from '~/common/services/event'
 *
 * emitter.emit('addToast', {
 *   color: 'green',
 *   header: '',
 *   content: '',
 *   closeButton: true,
 *   fixed: false,
 *   duration: 3000
 * })
 *
 */
const second = 1000

interface Props {
  id: string
  color: 'green' | 'grey' | 'red' | 'white'
  header?: any
  content?: any
  closeButton: boolean
  customButton?: any
  fixed: boolean
  duration: number
  remove: () => void
}

export const Toast: React.SFC<Props> = ({
  id,
  color,
  header,
  content,
  closeButton,
  button,
  fixed,
  duration,
  remove
}) => {
  const mainClass = classNames({
    toast: true,
    [color]: !!color
  })

  const contentClass = classNames({
    content: true,
    opaque: header && content
  })

  const iconCloseSrc = color === 'white' ? IconClose : IconCloseWhite

  const iconCloseStyle = { cursor: 'pointer' }

  const removeToast = () => {
    emitter.emit('removeToast', { id })
  }

  useEffect(() => {
    if (fixed !== true) {
      setTimeout(() => {
        removeToast()
      }, duration || 6 * second)
    }
  })

  return (
    <>
      <div className={mainClass}>
        <div>
          {header && <div className="header">{header}</div>}
          {content && <div className={contentClass}>{content}</div>}
        </div>
        {closeButton && (
          <Icon
            src={iconCloseSrc}
            style={iconCloseStyle}
            onClick={removeToast}
          />
        )}
        {!closeButton && customButton && customButton}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
