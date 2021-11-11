<template>
  <router-link class="event flex" :to="{ name: 'Event', params: { eventId: event.eventId } }">
    <div class="left flex">
      <span class="tracking-number">#{{ event.eventId }}</span>
      <span class="due-date">{{ event.paymentDueDate }}</span>
      <span class="person">{{ event.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">Kr {{ event.eventTotal }}</span>
      <div
        class="status-button flex"
        :class="{ paid: event.eventPaid, draft: event.eventDraft, pending: event.eventPending }"
      >
        <span v-if="event.eventPaid">Paid</span>
        <span v-if="event.eventDraft">Draft</span>
        <span v-if="event.eventPending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "event",
  props: ["event"],
};
</script>

<style lang="scss" scoped>
.event {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #5ab9ea;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>
