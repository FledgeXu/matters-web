import classNames from 'classnames'

import styles from './styles.css'

interface RowProps {
  type?: 'balance' | 'total' | 'insufficient' | 'breaker'
}

interface ColProps {
  type?: 'insufficient'
}

const Row: React.FC<RowProps> = ({ type, children }) => {
  const rowClasses = classNames({
    row: true,
    [`${type}`]: !!type,
  })

  return (
    <section className={rowClasses}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

const Col: React.FC<ColProps> = ({ type, children }) => {
  const colClasses = classNames({
    col: true,
    [`${type}`]: !!type,
  })

  return (
    <section className={colClasses}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

const ConfirmTable: React.FC & {
  Row: typeof Row
  Col: typeof Col
} = ({ children }) => (
  <section className="confirm-table">
    {children}
    <style jsx>{styles}</style>
  </section>
)

ConfirmTable.Row = Row
ConfirmTable.Col = Col

export default ConfirmTable
