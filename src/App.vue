<template>
  <div>
    <div class="app flex flex-column">
      <the-navigation></the-navigation>
      <div class="app-content flex flex-column">
        <transition name="invoice">
          <add-invoice v-if="invoiceModal"></add-invoice>
        </transition>
        <the-home></the-home>
        <single-invoice
          v-for="invoice in invoices"
          :key="invoice.id"
          :invoiceId="invoice.invoiceId"
          :fullName="invoice.fullName"
          :price="invoice.totalPrice"
          :InvStatus="invoice.status"
          :dueDate="invoice.dueDate"
        ></single-invoice>
        <!-- <router-view /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheNavigation from "./components/TheNavigation.vue";
import AddInvoice from "./components/AddInvoice.vue";
import SingleInvoice from "./components/SingleInvoice.vue";
import TheHome from "./views/TheHome.vue";
export default {
  components: {
    TheNavigation,
    AddInvoice,
    TheHome,
    SingleInvoice,
  },
  computed: {
    ...mapState(["invoiceModal"]),
    invoices() {
      return this.$store.getters.invoices;
    },
  },
  created() {
    this.$store.dispatch("loadInvoices");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.app {
  background-color: #141625;
  min-height: 100vh;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}

//inovice modal animation
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.6s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}
// utility classes
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}
.nav-link {
  text-decoration: none;
  color: initial;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
