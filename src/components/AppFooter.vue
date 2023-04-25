<template>
  <footer>
    <div class='header-container'>
      <div class='header-logo'>
        <p>Волжский дачник</p>
      </div>
    </div>
    <div class='actions' s>
      <p>+7 937 930 35 67</p>
      <div class='action-item'>
        <i class='bi bi-telegram'></i>
      </div>
      <div class='action-item'>
        <i class='bi bi-whatsapp'></i>
      </div>
    </div>


  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  padding: 1em;
  position: absolute;
}


footer p {
  color: white;
}

.bi {
  font-size: 1em;
  color: var(--main-color);
  cursor: pointer;
  padding: 0.5em;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>