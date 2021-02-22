import {
  RecommendAuthorDialog,
  RecommendTagDialog,
  Title,
  Translate,
} from '~/components'

import Tasks from '../Tasks'
import styles from './styles.css'

const OnboardingTasksWidget = () => {
  return (
    <section className="widget">
      <header>
        <Title type="feed" is="h2">
          <Translate
            zh_hant="歡迎遨遊 Matters 星際網絡"
            zh_hans="欢迎遨游 Matters 星际网络"
            en="Welcome to the Matters galaxy"
          />
        </Title>

        <p>
          <Translate
            zh_hant="導航帶你發現更多寶藏作者與優質作品，"
            zh_hans="导航带你发现更多宝藏作者与优质作品，"
            en="This guide will lead you to more precious creators and marvelous work,"
          />
          <br />
          <Translate
            zh_hant="更有首發限定好禮，留下創作足跡，"
            zh_hans="更有首发限定好礼，留下创作足迹，"
            en="as well as gifts for first publication,"
          />
          <br />
          <Translate
            zh_hant="即拿 LikeCoin 獎賞！🎉"
            zh_hans="即拿 LikeCoin 奖赏！🎉"
            en="leave your creation footprint and get LikeCoin reward! 🎉"
          />
        </p>
      </header>

      <Tasks />
      <RecommendAuthorDialog />
      <RecommendTagDialog />

      <style jsx>{styles}</style>
    </section>
  )
}

export default OnboardingTasksWidget
