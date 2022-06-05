import styles from './searchForm.module.scss'
import { SearchIcon, RemoveIcon } from 'assets/svgs'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, FormEvent } from 'react'
import { debounce } from 'lodash'
import store from 'store'

import cx from 'classnames'

import { inputValue } from 'states/inputValue'
import { useRecoil } from 'hooks/state'
import { useNavigate } from 'react-router-dom'

interface Props {
  popup: boolean
  setIsSearchShow: Dispatch<SetStateAction<boolean>>
  setSearchValue: Dispatch<SetStateAction<string>>
}

const SearchForm = ({ popup, setIsSearchShow, setSearchValue }: Props) => {
  const navigate = useNavigate()
  const [input, setInput] = useRecoil(inputValue)
  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchValue(value)
      }, 2000),
    [setSearchValue]
  )
  const handleInputClick = () => {
    if (popup) return
    setIsSearchShow((prev) => !prev)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInput(value)
    debounceSearch(value)
  }

  const handleCancelClick = () => {
    setIsSearchShow((prev) => !prev)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`bookdetail/${input}`)
    setInput('')
    let searchStoreArray = store.get('searchStore')
    const tmpArray = searchStoreArray.filter((item: string) => item !== input)
    searchStoreArray = [...tmpArray, input]
    store.set('searchStore', searchStoreArray)
  }

  const handleRemoveInputClick = () => {
    setInput('')
    setSearchValue('')
  }

  return (
    <div className={styles.searchForm}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <input className={styles.input} onClick={handleInputClick} onChange={handleChange} value={input} />
          {popup && (
            <button type='button' onClick={handleRemoveInputClick}>
              <RemoveIcon className={styles.removeIcon} />
            </button>
          )}
        </form>
        <button className={cx(styles.cancelBtn, { [styles.isExist]: popup })} type='button' onClick={handleCancelClick}>
          취소
        </button>
      </div>
    </div>
  )
}

export default SearchForm
