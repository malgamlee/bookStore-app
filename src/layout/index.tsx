import styles from './layout.module.scss'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
