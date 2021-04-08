import { CircleDigest, Switch, Translate } from '~/components'

import styles from './styles.css'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

export type ToggleCircleProps = {
  circle?: DigestRichCirclePublic | null
  accessType?: ArticleAccessType | null

  editAccess: (addToCircle: boolean, paywalled: boolean) => any
  saving: boolean

  canToggleCircle: boolean
  canTogglePaywall: boolean
}

const ToggleCircle: React.FC<ToggleCircleProps> = ({
  circle,
  accessType,

  editAccess,
  saving,

  canToggleCircle,
  canTogglePaywall,
}) => {
  const paywalled = accessType !== 'public'

  return (
    <section className="container">
      <section className="switch">
        <h4>
          <Translate zh_hant="加入圍爐" zh_hans="加入围炉" en="Add to Circle" />
        </h4>

        <Switch
          checked={!!circle}
          onChange={() => editAccess && editAccess(!circle, false)}
          loading={saving}
          disabled={!canToggleCircle}
        />
      </section>

      {circle && (
        <section className="widget">
          <section className="circle">
            <CircleDigest.Rich
              circle={circle}
              bgColor="none"
              avatarSize="xl"
              textSize="md-s"
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          </section>

          <section className="switch">
            <div>
              <h4>
                <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywalled" />
              </h4>
              <p>
                <Translate
                  zh_hant="前 24 小時限免後永久上鎖"
                  zh_hans="前 24 小时限免后永久上锁"
                  en="Free for 24 hours, then paywalled forever"
                />
              </p>
            </div>

            <Switch
              checked={paywalled}
              onChange={() => {
                if (!editAccess) {
                  return
                }

                editAccess(true, !paywalled)
              }}
              loading={saving}
              disabled={!canTogglePaywall}
            />
          </section>
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleCircle
