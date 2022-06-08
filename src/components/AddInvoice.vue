<template>
  <div
    @click="checkClick"
    ref="invoiceWrap"
    class="invoice-wrap flex flex-column"
  >
    <form @submit.prevent="submitForm" class="invoice-content">
      <h1>New Invoice</h1>

      <div class="bill-from flex flex-column">
        <h4>Bill from</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="billerStreetAddress"
            name="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input
              required
              type="text"
              id="billerCity"
              name="billerCity"
              v-model="billerCity"
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="billerZipCode"
              name="billerZipCode"
              v-model="billerZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input
              required
              type="text"
              id="billerCountry"
              name="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <div class="bill-to flex flex-column">
        <h4>Bill to</h4>

        <div class="input flex flex-column">
          <label for="clientName">Name</label>
          <input
            required
            type="text"
            id="clientName"
            name="clientName"
            v-model="clientName"
          />
        </div>

        <div class="input flex flex-column">
          <label for="clientEmail">E-mail</label>
          <input
            required
            type="text"
            id="clientEmail"
            name="clientEmail"
            v-model="clientEmail"
          />
        </div>

        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            name="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input
              required
              type="text"
              id="clientCity"
              name="clientCity"
              v-model="clientCity"
            />
          </div>

          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="clientZipCode"
              name="clientZipCode"
              v-model="clientZipCode"
            />
          </div>

          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input
              required
              type="text"
              id="clientCountry"
              name="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>
      </div>

      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              name="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              name="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select
            required
            type="text"
            id="paymentTerms"
            name="paymentTerms"
            v-model="paymentTerms"
          >
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>

        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            required
            type="text"
            id="productDescription"
            name="productDescription"
            v-model="productDescription"
          />
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>

            <tr
              class="table-items flex"
              v-for="item in invoiceItemList"
              :key="item.id"
            >
              <td class="item-name">
                <input type="text" v-model="item.itemName" />
              </td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price">
                <input type="text" v-model="item.price" />
              </td>
              <td class="total flex">
                {{ (item.total = item.qty * item.price) }}
              </td>
              <img
                src="@/assets/trash-bin.png"
                alt="Delete icon"
                @click="deleteInvoiceItem(item.id)"
              />
            </tr>
          </table>
          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/plus.png" alt="Add new item to invoice" />
            <p>Add New Item</p>
          </div>
        </div>
      </div>

      <div class="save flex">
        <div class="left">
          <button @click.prevent="closeInvoice" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button @click="saveDraft" class="dark-purple">Save Draft</button>
          <button @click="publishInvoice" class="purple">Create Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      dateOptions: { day: "2-digit", month: "short", year: "numeric" },
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  created() {
    this.invoiceDateUnix = Date.now();
    this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
      "en-US",
      this.dateOptions
    );
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    closeInvoice() {
      this.TOGGLE_INVOICE();
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: Date.now(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },

    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },

    totalAmount() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },
    // deleteInvoiceItem(item) {
    //   this.invoiceItemList.splice(this.invoiceItemList.indexOf(item), 1);
    // },

    publishInvoice() {
      this.invoicePending = true;
    },

    saveDraft() {
      this.invoiceDraft = true;
    },

    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        return; //handle error
      }

      this.totalAmount();
      const response = await fetch(
        "https://invoice-8eca3-default-rtdb.firebaseio.com/invoices.json",
        {
          method: "POST",
          body: JSON.stringify({
            invoiceId: new Date(),
            billerStreetAddress: this.billerStreetAddress,
            billerCity: this.billerCity,
            billerZipCode: this.billerZipCode,
            billerCountry: this.billerCountry,
            clientName: this.clientName,
            clientEmail: this.clientEmail,
            clientStreetAddress: this.clientStreetAddress,
            clientCity: this.clientCity,
            clientZipCode: this.clientZipCode,
            clientCountry: this.clientCountry,
            invoiceDate: this.invoiceDate,
            invoiceDateUnix: this.invoiceDateUnix,
            paymentTerms: this.paymentTerms,
            paymentDueDate: this.paymentDueDate,
            paymentDueDateUnix: this.paymentDueDateUnix,
            productDescription: this.productDescription,
            invoiceItemList: this.invoiceItemList,
            invoiceTotal: this.invoiceTotal,
            invoicePending: this.invoicePending,
            invoiceDraft: this.invoiceDraft,
            invoicePaid: null,
          })
        }
      );
      if(!response.ok){
        //print error message
      }
      this.TOGGLE_INVOICE();
    },

    submitForm() {
      this.uploadInvoice();
    },
  },
  watch: {
    paymentTerms() {
      const paymentDate = new Date();
      this.paymentDueDateUnix = paymentDate.setDate(
        paymentDate.getDate() + parseInt(this.paymentTerms)
      );
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString("en-US", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    overflow-y: scroll;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: white;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: white;
    }
    h3 {
      margin-bottom: 60px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }
            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;
            img {
              position: absolute;
              top: 10px;
              right: 0;
              cursor: pointer;
            }
          }
        }

        .button {
          color: white;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 8px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      fiv {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: white;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
  }
}
</style>
