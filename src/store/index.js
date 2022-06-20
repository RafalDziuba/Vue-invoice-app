import { createStore } from "vuex";

export default createStore({
  state: {
    invoiceModal: null,
    invoices: [],
    currentInvoice: [],
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },

    SET_INVOICES(state, payload) {
      state.invoices = payload;
    },

    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoice = state.invoices.filter((invoice) => {
        return invoice.invoiceId === payload;
      });
    },
  },
  actions: {
    async loadInvoices(context) {
      const response = await fetch(
        `https://invoice-8eca3-default-rtdb.firebaseio.com/invoices.json`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(response.message || "Failed to loadInvoices");
        throw error;
      }
      const newInvoices = [];
      for (const item in responseData) {
        const invoice = {
          id: item,
          invoiceId: responseData[item].invoiceId,
          fullName: responseData[item].clientName,
          totalPrice: responseData[item].invoiceTotal,
          status: responseData[item].invoicePending,
          dueDate: responseData[item].paymentDueDate,
        };
        newInvoices.push(invoice);
      }
      context.commit("SET_INVOICES", newInvoices);
    },
  },
  getters: {
    invoices(state) {
      return state.invoices;
    },
  },
  modules: {},
});
