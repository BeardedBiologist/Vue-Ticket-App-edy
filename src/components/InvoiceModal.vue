<template>
  <div @click="checkClick" ref="eventWrap" class="event-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="event-content">
      <Loading v-show="loading" />
      <h1 v-if="!editEvent">New Event</h1>
      <h1 v-else>Edit Event</h1>

      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>

      <!-- Event Work Details -->
      <div class="event-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="eventDate">Event Date</label>
            <input disabled type="text" id="eventDate" v-model="eventDate" />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="productDescription" />
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
            <tr class="table-items flex" v-for="(item, index) in eventItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total flex">Kr {{ (item.total = item.qty * item.price) }}</td>
              <img @click="deleteEventItem(item.id)" src="@/assets/icon-delete.svg" alt="" />
            </tr>
          </table>

          <div @click="addNewEventItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeEvent" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!editEvent" type="submit" @click="saveDraft" class="dark-purple">Save Draft</button>
          <button v-if="!editEvent" type="submit" @click="publishEvent" class="purple">Create Event</button>
          <button v-if="editEvent" type="sumbit" class="orange">Save Draft</button>
          <button v-if="editEvent" type="sumbit" class="purple">Update Event</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit";
import Loading from "../components/Loading";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
export default {
  name: "eventModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
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
      eventDateUnix: null,
      eventDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      eventPending: null,
      eventDraft: null,
      eventItemList: [],
      eventTotal: 0,
    };
  },
  components: {
    Loading,
  },
  created() {
    // get current date for event date field
    if (!this.editEvent) {
      this.eventDateUnix = Date.now();
      this.eventDate = new Date(this.eventDateUnix).toLocaleDateString("en-us", this.dateOptions);
    }

    if (this.editEvent) {
      const currentEvent = this.currentEventArray[0];
      this.docId = currentEvent.docId;
      this.billerStreetAddress = currentEvent.billerStreetAddress;
      this.billerCity = currentEvent.billerCity;
      this.billerZipCode = currentEvent.billerZipCode;
      this.billerCountry = currentEvent.billerCountry;
      this.clientName = currentEvent.clientName;
      this.clientEmail = currentEvent.clientEmail;
      this.clientStreetAddress = currentEvent.clientStreetAddress;
      this.clientCity = currentEvent.clientCity;
      this.clientZipCode = currentEvent.clientZipCode;
      this.clientCountry = currentEvent.clientCountry;
      this.eventDateUnix = currentEvent.eventDateUnix;
      this.eventDate = currentEvent.eventDate;
      this.paymentTerms = currentEvent.paymentTerms;
      this.paymentDueDateUnix = currentEvent.paymentDueDateUnix;
      this.paymentDueDate = currentEvent.paymentDueDate;
      this.productDescription = currentEvent.productDescription;
      this.eventPending = currentEvent.eventPending;
      this.eventDraft = currentEvent.eventDraft;
      this.eventItemList = currentEvent.eventItemList;
      this.eventTotal = currentEvent.eventTotal;
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_EVENT", "TOGGLE_MODAL", "TOGGLE_EDIT_EVENT"]),

    ...mapActions(["UPDATE_EVENT", "GET_EVENTS"]),

    checkClick(e) {
      if (e.target === this.$refs.eventWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeEvent() {
      this.TOGGLE_EVENT();
      if (this.editEvent) {
        this.TOGGLE_EDIT_EVENT();
      }
    },

    addNewEventItem() {
      this.eventItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },

    deleteEventItem(id) {
      this.eventItemList = this.eventItemList.filter((item) => item.id !== id);
    },

    calEventTotal() {
      this.eventTotal = 0;
      this.eventItemList.forEach((item) => {
        this.eventTotal += item.total;
      });
    },

    publishEvent() {
      this.eventPending = true;
    },

    saveDraft() {
      this.eventDraft = true;
    },

    async uploadEvent() {
      if (this.eventItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }

      this.loading = true;

      this.calEventTotal();

      const dataBase = db.collection("events").doc();

      await dataBase.set({
        eventId: uid(6),
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
        eventDate: this.eventDate,
        eventDateUnix: this.eventDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        eventItemList: this.eventItemList,
        eventTotal: this.eventTotal,
        eventPending: this.eventPending,
        eventDraft: this.eventDraft,
        eventPaid: null,
      });

      this.loading = false;

      this.TOGGLE_EVENT();

      this.GET_EVENTS();
    },

    async updateEvent() {
      if (this.eventItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }

      this.loading = true;

      this.calEventTotal();

      const dataBase = db.collection("events").doc(this.docId);

      await dataBase.update({
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
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        eventItemList: this.eventItemList,
        eventTotal: this.eventTotal,
      });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.eventId,
      };

      this.UPDATE_EVENT(data);
    },

    submitForm() {
      if (this.editEvent) {
        this.updateEvent();
        return;
      }
      this.uploadEvent();
    },
  },
  computed: {
    ...mapState(["editEvent", "currentEventArray"]),
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.event-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .event-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
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

    // Event Work

    .event-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table Styling
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
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
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
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
