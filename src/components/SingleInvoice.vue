<template>
  <div class="wrapper">
    <ul>
      <li>Due date</li>
      <li class="invoice-name">Full Name</li>
      <li>Price</li>
      <li class="invoice-status">Status</li>
      <a href="#">Details</a>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  width: 825px;
  height: 100px;
  background: rgba(255, 255, 255, 0.117);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.193);
  overflow: hidden;

  ul {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    transition: background 0.2s;
    cursor: pointer;

    li,
    a {
      text-decoration: none;
      color: white;
    }

    .invoice-name {
        text-transform: uppercase;
    }

    .invoice-status {
        padding: 5px 15px;
        border-radius: 15px;
    }
  }
  ul:hover {
    background: rgba(255, 255, 255, 0.488);
  }
}
</style>
