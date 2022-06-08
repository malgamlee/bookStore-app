import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { useRecoil } from 'hooks/state'
import Carousel from './Carousel'
import { RowBookList } from 'routes/Main/RowBookList'
import { bestSeller } from 'data/bestSeller'
import GNB from 'routes/_shared/GNB'
import cx from 'classnames'
import { getSearchListApi } from 'services/bookSearchApi'
import { inputValue, searchValue } from 'states/inputSearchValue'
import store from 'store'
import { useRecoilValue } from 'recoil'
import { SearchStructure } from 'types/searchStructure'
import SearchForm from 'components/SearchForm'
import { Loading } from 'components/Loading'
import styles from './main.module.scss'

const Main = () => {
  const [isSearchListShow, setIsSearchListShow] = useState(false)
  const search = useRecoilValue(searchValue)
  const input = useRecoilValue(inputValue)

  const [, setSearch] = useRecoil(searchValue)
  const [, setInput] = useRecoil(inputValue)

  useEffect(() => {
    setSearch('')
    setInput('')
  }, [setInput, setSearch])
  const searchStore = store.get('searchStore')

  const { data } = useQuery(
    ['getSearchListApi', search, input],
    () => getSearchListApi(search).then((res) => res.data),
    {
      enabled: !!search,
    }
  )

  const recentSearchList = searchStore.map((item: string, idx: number) => {
    const key = `${idx}_${item}`
    return (
      <li key={key} className={cx(styles.recentItem)}>
        <Link to={`bookdetail/${item}`} className={cx(styles.recentItemTitle)}>
          {item}
        </Link>
      </li>
    )
  })

  const searchList =
    data &&
    data.documents.map((item: SearchStructure) => (
      <li className={styles.searchItem} key={item.isbn}>
        <Link to={`bookdetail/${item.publisher} ${item.title}`}>
          <span className={styles.bookTitle}>{item.title}</span>
          <span className={styles.bookAuthors}>{item.authors}</span>
        </Link>
      </li>
    ))

  return (
    <div className={styles.main}>
      <GNB />
      <div className={styles.mainWrapper}>
        <SearchForm isPopup={false} setIsSearchListShow={setIsSearchListShow} />
        <div>
          <Carousel />
        </div>
        <div>베스트셀러</div>
        <RowBookList bookList={bestSeller} />
      </div>
      <div className={cx(styles.mobileSearch, { [styles.isShow]: isSearchListShow })}>
        <SearchForm isPopup setIsSearchListShow={setIsSearchListShow} />
        <div className={cx(styles.searchList, styles.isExist)}>
          {input && data ? (
            <ul className={styles.searchValueList}>{searchList}</ul>
          ) : (
            <div className={styles.recentSearchList}>
              <p>최근 검색어 목록</p>
              {searchStore.length > 0 ? (
                <ul className={styles.recentSearch}>{recentSearchList}</ul>
              ) : (
                <div className={styles.noRecentSearch}>최근 저장된 검색어가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
      <Loading />
    </div>
  )
}

export default Main
