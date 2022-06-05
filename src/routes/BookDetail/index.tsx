import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import GNB from 'routes/_shared/GNB'
import { getSearchListApi } from 'services/bookSearchApi'
import styles from './bookDetail.module.scss'
import { MouseEvent, useEffect, useState } from 'react'
import store from 'store'
import { useRecoil } from 'hooks/state'
import { cartStoreState, likeStoreState } from 'states/storeState'
import { HeartIcon, CartIcon } from 'assets/svgs'
import cx from 'classnames'
import { SearchStructure } from 'types/searchStructure'
import thousandReExp from 'utils/thousandReExp'
import { inputValue, searchValue } from 'states/inputSearchValue'

const BookDetail = () => {
  const { paramValue } = useParams()
  const [isInCart, setIsInCart] = useState(false)
  const [isInLike, setIsInLike] = useState(false)
  const [cartStore, setCartStore] = useRecoil(cartStoreState)
  const [likeStore, setLikeStore] = useRecoil(likeStoreState)
  const [, setSearch] = useRecoil(searchValue)
  const [, setInput] = useRecoil(inputValue)

  useEffect(() => {
    setSearch('')
    setInput('')
  }, [setInput, setSearch])

  const { data, isLoading } = useQuery(
    ['getSearchListApi', paramValue],
    () => getSearchListApi(paramValue).then((res) => res.data),
    {
      enabled: !!paramValue,
    }
  )

  const handleClickBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === undefined) return
    addRemoveBook(value)
  }

  const addRemoveBook = (value: string) => {
    const storeData = store.get(value)
    const checkIsIn = value === 'cartStore' ? isInCart : isInLike
    const setCheckIsIn = value === 'cartStore' ? setIsInCart : setIsInLike

    if (!checkIsIn) {
      if (storeData.length > 0) {
        const tempData = storeData.filter((item: SearchStructure) => item.isbn !== data.documents[0].isbn)
        store.set(value, [...tempData, data.documents[0]])
      } else {
        store.set(value, [data.documents[0]])
      }
      setCheckIsIn(true)
    } else {
      store.set(
        value,
        storeData.filter((item: SearchStructure) => item.isbn !== data.documents[0].isbn)
      )
      setCheckIsIn(false)
    }
    if (value === 'cartStore') setCartStore(store.get(value))
    else setLikeStore(store.get(value))
  }

  useEffect(() => {
    if (data) {
      const checkCart = cartStore.filter((item) => item.isbn === data.documents[0].isbn)
      if (checkCart.length > 0) setIsInCart(true)
      const checkLike = likeStore.filter((item: { isbn: string }) => item.isbn === data.documents[0].isbn)
      if (checkLike.length > 0) setIsInLike(true)
    }
  }, [cartStore, data, likeStore])

  return (
    <div className={styles.bookDetail}>
      <GNB />
      {!isLoading && data ? (
        <div>
          <div className={styles.detailWrapper}>
            <img className={styles.bookImg} src={data.documents[0].thumbnail} alt={`${data.documents[0].title}_img`} />
            <div className={styles.content}>
              <div className={styles.book}>
                <div className={styles.bookTitle}>{data.documents[0].title}</div>
                <div className={styles.bookAuthor}>
                  {data.documents[0].authors} 저 | {data.documents[0].publisher} 출판 (
                  {data.documents[0].datetime.split('T')[0].replaceAll('-', '. ')})
                </div>
                <div className={styles.bookPrice}>판매가 {thousandReExp(data.documents[0].sale_price)}</div>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  type='button'
                  onClick={handleClickBtn}
                  data-value='likeStore'
                  className={cx(styles.smallBtn, { [styles.isInLike]: isInLike })}
                >
                  <HeartIcon />
                </button>
                <button
                  type='button'
                  onClick={handleClickBtn}
                  data-value='cartStore'
                  className={cx(styles.smallBtn, { [styles.isInCart]: isInCart })}
                >
                  <CartIcon />
                </button>
                <button type='button' onClick={handleClickBtn} data-value='buyStore' className={styles.bigBtn}>
                  구매하기
                </button>
              </div>
            </div>
          </div>
          <div className={styles.bookExplain}>
            <p>작품 소개</p>
            <div className={styles.explain}>
              {data.documents[0].contents} ...<a href={data.documents[0].url}>더보기</a>
            </div>
          </div>
        </div>
      ) : (
        <div>sdfds</div>
      )}
    </div>
  )
}

export default BookDetail
