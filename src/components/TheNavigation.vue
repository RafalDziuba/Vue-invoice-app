<template>
  <header class="flex">
    <div class="branding flex">
      <img src="../assets/appLogo.png" alt="note with pen site logo">
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  z-index: 4;
  flex-direction: row;
  background-color: #1e2139;

  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    // img {
    //     width: 50px;
    // }
    @media (min-width: 900px) {
      width: 100%;
    }
  }
}
</style>
