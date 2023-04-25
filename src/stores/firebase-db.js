import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from 'firebase/firestore'
import { app } from '@/stores/firebase-config'
import { loadFile } from '@/stores/firebase-storage'
import * as url from 'url'

const db = getFirestore(app)

export const PRODUCT_TABLE = 'products'
export const PRODUCT_BASKET = 'baskets'



export async function getProductByDiscount(){
  const q = query(collection(db, PRODUCT_TABLE).withConverter(productConverter), where("discount", ">" , 0))
  const response = await getDocs(q)
  return await parseToList(response)
}
export async function getProductsByCategory(category){
  const q = query(collection(db, PRODUCT_TABLE).withConverter(productConverter), where("category", "==" , category))
  const response =  await getDocs(q)
  return await parseToList(response)
}

export async function getAllProduct() {
  const response = await getDocs(collection(db, PRODUCT_TABLE).withConverter(productConverter))
  return await parseToList(response)
}

async function parseToList(response){
  let result = []
  for (let i = 0; i < response.docs.length; i++) {
    const doc = response.docs[i].data()
    const product = response.docs[i].data()
    product.id = doc.id
    product.imgUrl = await loadFile(product.img)
    result.push(product)
  }
  return result
}

export async function getProductById(id) {
  const ref = doc(db, PRODUCT_TABLE, id).withConverter(productConverter)
  const result = await getDoc(ref)
  const product = result.data()
  product.imgUrl = await loadFile(product.img)
  return product
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, PRODUCT_TABLE, id))
}

export async function insertProduct(product) {
  if (product.id === "") {
    const ref = doc(collection(db, PRODUCT_TABLE)).withConverter(productConverter)
    product.id = ref.id
    await setDoc(ref, product)
  } else {
    await setDoc(doc(db, PRODUCT_TABLE, product.id).withConverter(productConverter), product)
  }

}


const productConverter = {
  toFirestore: (product) => {
    return {
      id: product.id,
      name: product.name,
      about: product.about,
      price: product.price,
      discount: product.discount,
      img: product.img,
      category: product.category
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Product(snapshot.id, data.name, data.about, data.price, data.discount, data.img, data.category)
  }
}

const basketItemConverter = {
  toFirestore: (item) => {
    return {
      userId: item.userId,
      itemId: item.itemId,
      count: item.count
    }
},

  fromFirestore: (s, op) => {
    const  data = s.data(op)
    return new BasketItem(data.userId, data.itemId, data.count)
  }
}


export class BasketItem{

  constructor(userId, itemId, count) {
    this.userIs = userId
    this.itemId = itemId
    this.count = count
  }

  increment(){
    this.count++
  }

  decrement(){
    this.count--
  }
}

export class Product {
  get imgUrl() {
    return this._imgUrl
  }

  set imgUrl(value) {
    this._imgUrl = value
  }
  get category() {
    return this._category
  }

  set category(value) {
    this._category = value
  }


  get id() {
    return this._id
  }

  set id(value) {
    this._id = value
  }

  get name() {
    return this._name
  }

  set name(value) {
    this._name = value
  }

  get about() {
    return this._about
  }

  set about(value) {
    this._about = value
  }

  get price() {
    return this._price
  }

  set price(value) {
    this._price = value
  }

  get discount() {
    return this._discount
  }

  set discount(value) {
    this._discount = value
  }

  get img() {
    return this._imgName
  }

  set img(value) {
    this._imgName = value
  }

  constructor(id, name, about, price, discount, imgName, category) {
    this._id = id
    this._name = name
    this._about = about
    this._price = price
    this._discount = discount
    this._imgName = imgName
    this._imgUrl = ""
    this._category = category
  }

  static empty(){
    return new Product("", "", "", 0, 0, "", "")
  }

  getPriceWithDiscount(){
    return this.price  - this.price * (this.discount / 100)
  }


}