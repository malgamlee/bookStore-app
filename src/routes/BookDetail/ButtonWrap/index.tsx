import { HeartIcon, CartIcon } from 'assets/svgs'
import styles from './buttonWrap.module.scss'
import cx from 'classnames'
import { MouseEventHandler } from 'react'

interface Props {
  handleClickBtn: MouseEventHandler<HTMLButtonElement>
  isInLike: boolean
  isInCart: boolean
  price: string
}

const ButtonWrap = ({ handleClickBtn, isInLike, isInCart, price }: Props) => {
  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.price}>{price} 원</div>
      <div className={styles.buttons}>
        <button
          type='button'
          onClick={handleClickBtn}
          data-value='likeStore'
          className={cx(styles.smallBtn, { [styles.isInLike]: isInLike })}
        >
          <HeartIcon className={styles.icon} />
        </button>
        <button
          type='button'
          onClick={handleClickBtn}
          data-value='cartStore'
          className={cx(styles.smallBtn, { [styles.isInCart]: isInCart })}
        >
          <CartIcon className={styles.icon} />
        </button>
        <button type='button' className={styles.bigBtn} onClick={handleClickBtn} data-value='buyStore'>
          구매하기
        </button>
      </div>
    </div>
  )
}

export default ButtonWrap
