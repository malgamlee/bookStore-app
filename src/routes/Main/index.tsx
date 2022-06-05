import styles from './main.module.scss'
import Carousel from './Carousel'
import { RowBookList } from 'routes/Main/RowBookList'
import { bestSeller } from 'data/bestSeller'
import SearchForm from 'components/SearchForm'
import GNB from 'routes/_shared/GNB'
import cx from 'classnames'
import { useState } from 'react'
import { getSearchListApi } from 'services/bookSearchApi'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { inputValue } from 'states/inputValue'
import { Link } from 'react-router-dom'
import store from 'store'
import { SearchStructure } from 'types/searchStructure'

const Main = () => {
  const [isSearchShow, setIsSearchShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const input = useRecoilValue(inputValue)

  const searchStore = store.get('searchStore')

  const { data } = useQuery(
    ['getSearchListApi', searchValue, input],
    () => getSearchListApi(searchValue).then((res) => res.data),
    {
      enabled: !!searchValue,
    }
  )
  return (
    <div className={styles.main}>
      <GNB />
      <div className={styles.mainWrapper}>
        <SearchForm popup={false} setIsSearchShow={setIsSearchShow} setSearchValue={setSearchValue} />
        <div>
          <Carousel />
        </div>
        <div>베스트셀러</div>
        <RowBookList bookList={bestSeller} />
      </div>
      <div className={cx(styles.mobileSearch, { [styles.isShow]: isSearchShow })}>
        <SearchForm popup setIsSearchShow={setIsSearchShow} setSearchValue={setSearchValue} />
        <div className={cx(styles.searchList, styles.isExist)}>
          {input && data ? (
            <ul className={styles.searchValueList}>
              {data.documents.map((item: SearchStructure) => (
                <li className={styles.searchItem} key={item.isbn}>
                  <Link to={`bookdetail/${item.publisher} ${item.title}`}>
                    <span className={styles.bookTitle}>{item.title}</span>
                    <span className={styles.bookAuthors}>{item.authors}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            // 수정필요
            <div className={styles.recentSearchList}>
              <p>최근 검색어 목록</p>
              {searchStore.length > 0 ? (
                <ul className={styles.recentSearch}>
                  {searchStore.map((item: string, idx: number) => {
                    const key = `${idx}_${item}`
                    return (
                      <li key={key} className={cx(styles.recentItem)}>
                        <Link to={`bookdetail/${item}`} className={cx(styles.recentItemTitle)}>
                          {item}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className={styles.noRecentSearch}>최근 저장된 검색어가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main
