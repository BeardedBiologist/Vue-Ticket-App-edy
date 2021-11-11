<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Events</h1>
        <span>There are {{ eventData.length }} total events</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span
            >Filter by status <span v-if="filteredEvent">: {{ filteredEvent }}</span></span
          >
          <img src="@/assets/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredEvents">Draft</li>
            <li @click="filteredEvents">Pending</li>
            <li @click="filteredEvents">Paid</li>
            <li @click="filteredEvents">Clear Filter</li>
          </ul>
        </div>
        <div @click="newEvent" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Event</span>
        </div>
      </div>
    </div>
    <!-- Events -->
    <div v-if="eventData.length > 0">
      <Event v-for="(event, index) in filteredData" :event="event" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>Create a new event by clicking the New Event button and get started</p>
    </div>
  </div>
</template>

<script>
import Event from "../components/Event";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredEvent: null,
    };
  },
  components: {
    Event,
  },
  methods: {
    ...mapMutations(["TOGGLE_EVENT"]),
    newEvent() {
      this.TOGGLE_EVENT();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filteredEvents(e) {
      if (e.target.innerText === "Clear Filter") {
        this.filteredEvent = null;
        return;
      }
      this.filteredEvent = e.target.innerText;
    },
  },
  computed: {
    ...mapState(["eventData"]),

    filteredData() {
      return this.eventData.filter((event) => {
        if (this.filteredEvent === "Draft") {
          return event.eventDraft === true;
        }
        if (this.filteredEvent === "Pending") {
          return event.eventPending === true;
        }
        if (this.filteredEvent === "Paid") {
          return event.eventPaid === true;
        }
        return event;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #5ab9ea;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #5ab9ea;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #8860d0;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
