import { atom } from 'recoil'

export const inputValue = atom<string>({
  key: 'inputValue',
  default: '',
})
