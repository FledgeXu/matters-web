import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Button, IconComment16, TextIcon } from '~/components'

import { URL_FRAGMENT } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'

import { ActionsResponseCountArticle } from './__generated__/ActionsResponseCountArticle'

interface ResponseCountProps {
  article: ActionsResponseCountArticle
  size?: 'sm' | 'xs'
  inCard: boolean
}

const fragments = {
  article: gql`
    fragment ActionsResponseCountArticle on Article {
      id
      slug
      articleState: state
      mediaHash
      responseCount
      author {
        userName
      }
    }
  `,
}

const ResponseCount = ({
  article,
  size = 'sm',
  inCard,
}: ResponseCountProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    fragment: URL_FRAGMENT.COMMENTS,
  })
  const isBanned = state === 'banned'

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      {...path}
      disabled={isBanned}
      aira-label="查看評論"
    >
      <TextIcon
        icon={<IconComment16 size={size === 'xs' ? 'xs' : undefined} />}
        color="grey"
        weight="md"
        size={size}
      >
        {article.responseCount > 0 ? numAbbr(article.responseCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
