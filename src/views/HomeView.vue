<template>
  <main>
    <section class='preview'>
      <div class='preview-container'>
        <h1>Скидка 20% на все цветы</h1>
<!--        <input class='search' type='search' placeholder='Что вы ищите?'>-->
        <button class='btn-primary' type='button' @click = '_toCategory(0)'>К покупкам</button>
      </div>
    </section>

    <section class='assortment'>
      <div class='container'>
        <p class='section-header'>Выберите интересующий вас раздел</p>
        <div class='assortment-container'>
          <div class='assortment-card flowers' @click = '_toCategory(1)'>
            <div class='assortment-card-square bg-blue-light'>
              <p class='assortment-card-text'> Цветы</p>
            </div>
          </div>
          <div class='assortment-card trees' @click = '_toCategory(2)'>
            <div class='assortment-card-square bg-green'>
              <p class='assortment-card-text'>Саженцы</p>
            </div>
          </div>
          <div class='assortment-card seeds' @click = '_toCategory(3)'>
            <div class='assortment-card-square bg-pur'>
              <p class='assortment-card-text'>Семена</p>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section class='section-gallery'>


    </section>

  </main>
</template>

<script setup>


import { filter, loggedUser } from '@/stores/local'
import router from '@/router'

const user = loggedUser()

function _toCategory(value){
  filter().num = value
  router.push("/category")
}


</script>

<style scoped>



.preview {
  display: flex;
  justify-content: center;
  background: url("@/assets/img/header-bg.png") no-repeat center;
  background-size: cover;
  padding-top: var(--header-heigth);
  min-height: 90vh;
  width: 100%;
}

.preview-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 1em;
  align-items: center;

}

.assortment-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 25px 0;
  justify-content: space-between;
}

.assortment-card {
  width: var(--card-size);
  height: var(--card-size);
  padding: 25px;
  cursor: pointer;
  transition: 0.5s;
  margin: 25px auto;
}

.assortment-card:hover {
  background: transparent;
}

.assortment-card-square {
  display: flex;
  justify-content: center;
  align-items: center;
  background: brown;
  width: 100%;
  height: 100%;
}

section .section-header {
  width: 100%;
  display: block;
  padding-bottom: 10px;
  color: var(--grey);
  font-size: 24px;
  border-bottom: solid var(--grey) 2px;
}

.assortment-card-square.bg-blue-light {
  background: #72C6C7;
}

.assortment-card-square.bg-green {
  background: #208863;
}

.assortment-card-square.bg-pur {
  background: #882071;
}

.assortment-card-square.bg-blue-light:hover,
.assortment-card-square.bg-green:hover,
.assortment-card-square.bg-pur:hover {
  background: transparent;
  transition: 0.5s;
  font-size: 2em;
}

.assortment-card-text {
  color: white;
}

.assortment-card.flowers {
  background: url("@/assets/img/flowers-bg.png") no-repeat center;
  background-size: cover;
}

.assortment-card.trees {
  background: url("@/assets/img/trees-bg.png") no-repeat center;
  background-size: cover;
}

.assortment-card.seeds {
  background: url("@/assets/img/seeds-bg.png") no-repeat center;
  background-size: cover;
}



</style>
