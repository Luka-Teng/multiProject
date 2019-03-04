import { configure } from 'mobx'
import StoreClasses from '@/store'

configure({enforceActions: 'observed'})

class Store {
  constructor () {
    for (let key in StoreClasses) {
      this[key] = new StoreClasses[key]()
    }
  }
}

const store = new Store()

export default store
