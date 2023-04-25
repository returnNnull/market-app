import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'


export const loggedUser = defineStore('loggedUser', () => {
  const id = ref("")
  const displayName = ref("")
  const isLogged = ref(false)


  function clear(){
    this.id = ""
    this.displayName = ""
    this.isLogged = false
  }

  function set(id, name){
    this.id = id
    this.displayName = name
    this.isLogged = true
  }

  return {id, displayName, isLogged , set, clear}
})


export const filter = defineStore("filter", ()=> {
  const num = ref(0)
  const word = ref("")
  return {num, word}
})

export const basket = defineStore('basket', () => {

  const list = reactive(JSON.parse(window.localStorage.getItem('basket-items')) || [])
  const size = ref(list.length)

  const sum = ref(parseFloat(window.localStorage.getItem('basket-sum') || 0))



  function add(id, price){
    const index = indexInList(id)
    if (index > -1){
      list[index].count++
    }
    else {
      list.value = list.push({id: id, count:1, price : price})
    }
    plus(price)
    size.value++
    saveLocal()
  }

  function indexInList(id){
    for (let i = 0; i < list.length; i++){
      if (list[i].id === id){
        return i
      }
    }
    return -1
  }


  function saveLocal(){
    window.localStorage.setItem("basket-items",JSON.stringify(list))
    window.localStorage.setItem("basket-sum", sum.value.toString())
  }


  function plus(price){
     sum.value += parseFloat(price)
  }

  function minus(price){
    sum.value -= parseFloat(price)
  }

  function remote(id){
    for (let i = 0; i < list.length; i++){
      if (list[i].id === id){
        if (list[i].count > 0){
          list[i].count--
          size.value--
          minus(list[i].price)
          saveLocal()
        }
        break
      }
    }
  }

  function deleteFromBasket(id){
    for (let i = 0; i < list.length; i++){
      if (list[i].id === id.toString()){
        minus(list[i].price * list[i].count)
        let index = list.indexOf(list[i])
        list.value = list.splice(index, 1)
        saveLocal()
        size.value -= list[i].count
        break
      }
    }
  }

  return {list, size, add, remote, saveLocal, sum, deleteFromBasket}
})

class BasketItem{
  constructor(id, count) {
    this.id = id;
    this.count = count
  }
}


