import _get from 'lodash/get'
import Link from 'next/link'

import { FeedDigestComment } from '~/components/GQL/fragments/__generated__/FeedDigestComment'
import { FolloweeFeedDigestComment } from '~/components/GQL/fragments/__generated__/FolloweeFeedDigestComment'

import { toPath } from '~/common/utils'

import styles from './styles.css'

const CommentToArticle = ({
  comment
}: {
  comment: FeedDigestComment | FolloweeFeedDigestComment
}) => {
  if (!comment.article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: comment.article.author.userName || '',
    slug: comment.article.slug || '',
    mediaHash: comment.article.mediaHash || ''
  })
  const title = _get(comment, 'article.title')

  return (
    <section className="comment-to-article">
      <Link {...path}>
        <a className="article-title">{title}</a>
      </Link>

      <style jsx>{styles}</style>
    </section>
  )
}

export default CommentToArticle
