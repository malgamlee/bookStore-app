import styles from './myPage.module.scss'
import TopNavBar from 'components/TopNavBar'
import { PersonIcon, HeartIcon, CartIcon, TruckIcon, SettingIcon } from 'assets/svgs'
import { MouseEvent } from 'react'
import { userInfoState } from 'states/userInfo'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const User = () => {
  const userInfo = useRecoilValue(userInfoState)
  const navigate = useNavigate()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    navigate(`/${value}`)
  }
  return (
    <div className={styles.myPage}>
      <TopNavBar title='마이페이지' />
      <div className={styles.myPageContent}>
        <div className={styles.wrapper}>
          <div className={styles.userPhoto}>
            <PersonIcon />
          </div>
        </div>
        <div className={styles.myPageDatail}>
          <div className={styles.userName}>
            {userInfo.userName} ({userInfo.userId})
          </div>
          <div className={styles.buttonWrapper}>
            <button type='button' className={styles.buttons} onClick={handleClick} data-value='wishList'>
              <HeartIcon />
              <div>좋아요</div>
            </button>
            <button type='button' className={styles.buttons} onClick={handleClick} data-value='cart'>
              <CartIcon />
              <div>장바구니</div>
            </button>
            <button type='button' className={styles.buttons} onClick={handleClick} data-value='order'>
              <TruckIcon />
              <div>주문조회</div>
            </button>
            <button type='button' className={styles.buttons} onClick={handleClick} data-value='setting'>
              <SettingIcon />
              <div>설정</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
