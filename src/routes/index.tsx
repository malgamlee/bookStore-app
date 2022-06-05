import { Routes, Route } from 'react-router-dom'
import styles from './routes.module.scss'
import Main from './Main'
import Layout from 'layout'
import BookDetail from './BookDetail'
import Cart from './Cart'
import User from './Mypage'
import WishList from './WishList'
import store from 'store'

const App = () => {
  if (!store.get('searchStore')) {
    store.set('searchStore', [])
  }
  if (!store.get('likeStore')) {
    store.set('likeStore', [])
  }
  if (!store.get('cartStore')) {
    store.set('cartStore', [])
  }
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='cart' element={<Cart />} />
            <Route path='user' element={<User />} />
            <Route path='wishList' element={<WishList />} />
            <Route path='bookdetail/:paramValue' element={<BookDetail />} />
          </Route>
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
