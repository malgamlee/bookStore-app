import cx from 'classnames'
import { MouseEvent } from 'react'
import styles from './modal.module.scss'

interface Props {
  contents: string
  isShow: boolean
  name: string
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  setClickBtn: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ contents, isShow, name, setIsShow, setClickBtn }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsShow(false)

    if (e.currentTarget.dataset.value === 'ok') setClickBtn(true)
  }

  return (
    <div className={cx(styles.modalDiv, { [styles.isShow]: isShow })}>
      <div className={cx(styles.modal)}>
        <p>{contents}</p>
        <div className={styles.buttonWrapper}>
          <button type='button' className={styles.cancelBtn} onClick={handleClick} data-value='cancel'>
            취소
          </button>
          <button type='button' className={styles.okBtn} onClick={handleClick} data-value='ok'>
            {name}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
