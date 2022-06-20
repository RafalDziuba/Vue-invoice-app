<template>
  <div></div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      currentInvoice: null,
    };
  },
  name: "InvoiceDetails",
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE"]),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
    },
  },
  computed: {
    ...mapState(["currentInvoice"]),
  },
};
</script>
