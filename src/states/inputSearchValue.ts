import { atom } from 'recoil'

export const inputValue = atom<string>({
  key: 'inputValue',
  default: '',
})

export const searchValue = atom<string>({
  key: 'searchValue',
  default: '',
})
