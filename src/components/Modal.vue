<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex">
        <button @click="closeModal" class="green">Return</button>
        <button @click="closeEvent" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "modal",
  methods: {
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_EVENT", "TOGGLE_EDIT_EVENT"]),

    closeModal() {
      this.TOGGLE_MODAL();
    },

    closeEvent() {
      this.TOGGLE_MODAL();
      this.TOGGLE_EVENT();
      if (this.editEvent) {
        this.TOGGLE_EDIT_EVENT();
      }
    },
  },
  computed: {
    ...mapState(["editEvent"]),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 103;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: rgba(159, 90, 253, 1);
    color: #fff;

    p {
      text-align: center;
    }

    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>
