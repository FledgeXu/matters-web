import classNames from 'classnames'

import {
  IconAvatarLogo32,
  IconBookmark16,
  IconClap16,
  IconComment16,
  IconUpVote16,
  IconUser16,
  IconVolume16,
} from '~/components'

import styles from './styles.css'

type IconType =
  | 'appreciate'
  | 'bookmark'
  | 'comment'
  | 'logo'
  | 'user'
  | 'upvote'
  | 'volume'

const getIcon = (type: IconType) => {
  switch (type) {
    case 'appreciate':
      return <IconClap16 color="green" />
    case 'bookmark':
      return <IconBookmark16 color="green" />
    case 'comment':
      return <IconComment16 color="green" />
    case 'logo':
      return <IconAvatarLogo32 size="lg" />
    case 'user':
      return <IconUser16 color="green" size="lg" />
    case 'upvote':
      return <IconUpVote16 color="green" />
    case 'volume':
      return <IconVolume16 color="grey-dark" size="lg" />
  }
}

const NoticeTypeIcon = ({
  hasSpacing,
  type,
}: {
  hasSpacing?: boolean
  type: IconType
}) => {
  const icon = getIcon(type)

  const iconWrapClasses = classNames({
    'icon-wrap': hasSpacing,
  })

  return (
    <section className={iconWrapClasses}>
      {icon}
      <style jsx>{styles}</style>
    </section>
  )
}

export default NoticeTypeIcon
