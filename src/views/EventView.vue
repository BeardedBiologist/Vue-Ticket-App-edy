<template>
  <div v-if="currentEvent" class="event-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentEvent.eventPaid,
            draft: currentEvent.eventDraft,
            pending: currentEvent.eventPending,
          }"
        >
          <span v-if="currentEvent.eventPaid">Paid</span>
          <span v-if="currentEvent.eventDraft">Draft</span>
          <span v-if="currentEvent.eventPending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditEvent" class="dark-purple">Edit</button>
        <button @click="deleteEvent(currentEvent.docId)" class="red">Delete</button>
        <button @click="updateStatusToPaid(currentEvent.docId)" v-if="currentEvent.eventPending" class="green">
          Mark as Paid
        </button>
        <button
          v-if="currentEvent.eventDraft || currentEvent.eventPaid"
          @click="updateStatusToPending(currentEvent.docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Event Details -->
    <div class="event-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentEvent.eventId }}</p>
          <p>{{ currentEvent.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentEvent.billerStreetAddress }}</p>
          <p>{{ currentEvent.billerCity }}</p>
          <p>{{ currentEvent.billerZipCode }}</p>
          <p>{{ currentEvent.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Event Date</h4>
          <p>
            {{ currentEvent.eventDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentEvent.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentEvent.clientName }}</p>
          <p>{{ currentEvent.clientStreetAddress }}</p>
          <p>{{ currentEvent.clientCity }}</p>
          <p>{{ currentEvent.clientZipCode }}</p>
          <p>{{ currentEvent.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentEvent.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div v-for="(item, index) in currentEvent.eventItemList" :key="index" class="item flex">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentEvent.eventTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "eventView",
  data() {
    return {
      currentEvent: null,
    };
  },
  created() {
    this.getCurrentEvent();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_EVENT", "TOGGLE_EDIT_EVENT", "TOGGLE_EVENT"]),

    ...mapActions(["DELETE_EVENT", "UPDATE_STATUS_TO_PENDING", "UPDATE_STATUS_TO_PAID"]),

    getCurrentEvent() {
      this.SET_CURRENT_EVENT(this.$route.params.eventId);
      this.currentEvent = this.currentEventArray[0];
    },

    toggleEditEvent() {
      this.TOGGLE_EDIT_EVENT();
      this.TOGGLE_EVENT();
    },

    async deleteEvent(docId) {
      await this.DELETE_EVENT(docId);
      this.$router.push({ name: "Home" });
    },

    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },

    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    ...mapState(["currentEventArray", "editEvent"]),
  },
  watch: {
    editEvent() {
      if (!this.editEvent) {
        this.currentEvent = this.currentEventArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.event-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .event-details {
    background-color: #5ab9ea;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .event-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #fff;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>
