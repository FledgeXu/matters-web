import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import { IMAGE_PIXEL } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { DonatorsArticle } from './__generated__/DonatorsArticle'

interface DonatorsProps {
  article: DonatorsArticle
}

const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      donations: transactionsReceivedBy(
        input: { first: 10, purpose: donation }
      ) {
        totalCount
        edges {
          cursor
          node {
            ... on User {
              id
              ...AvatarUser
            }
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `,
}

const Donators = ({ article }: DonatorsProps) => {
  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, 10)

  return (
    <section className="container">
      {donatorsCount > 0 && (
        <section className="count">
          {numAbbr(donatorsCount)}
          <Translate
            zh_hant={' 人支持了作者'}
            zh_hans={' 人支持了作者'}
            en=" users supported author"
          />
        </section>
      )}

      <section className="avatar-list">
        {donators.map((user, index) => (
          <Avatar
            user={user || undefined}
            src={user ? undefined : IMAGE_PIXEL}
            size="sm"
            key={index}
          />
        ))}
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

Donators.fragments = fragments

export default Donators
