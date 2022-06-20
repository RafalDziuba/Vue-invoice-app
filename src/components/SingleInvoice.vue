<template>
  <router-link
    :to="{ name: 'InvoiceDetails' , params: { invoiceId: invoiceId }}"
  >
    <div class="wrapper">
      <ul>
        <li class="default-width">Due: {{ dueDate }}</li>
        <li class="invoice-name default-width">{{ fullName }}</li>
        <li class="default-width price-item">{{ price }}zł</li>
        <li :class="['invoice-status', InvStatus ? 'pending' : 'paid']">
          {{ setStatus }}
        </li>
        <a href="#"
          ><img src="@/assets/viewDetails.png" alt="View details icon"
        /></a>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["fullName", "price", "InvStatus", "dueDate", "invoiceId"],

  computed: {
    setStatus() {
      return this.InvStatus ? "Pending" : "Paid";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  margin-bottom: 30px;
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

    .pending {
      background-color: rgba(245, 176, 47, 0.704);
      box-shadow: 0px 0px 23px -5px rgba(245, 176, 47, 0.704);
    }

    .paid {
      background-color: rgba(82, 223, 66, 0.545);
      box-shadow: 0px 0px 23px -5px rgba(82, 223, 66, 0.545);
    }

    .default-width {
      width: 160px;
    }
    .price-item {
      width: 100px;
    }
  }
  ul:hover {
    background: rgba(255, 255, 255, 0.264);
  }
}
</style>
