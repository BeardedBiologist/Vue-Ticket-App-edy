<template>
  <header class="flex">
    <div @click="clickMethod" class="branding flex">
      <img @click="clickMethod" src="@/assets/new/people.event.png" alt="" />
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {

    };
  },
  methods: {
    clickMethod() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  z-index: 105;
  flex-direction: row;
  background-color: #5f5aea;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #8f5aea;
    justify-content: center;
    padding: 24px;
    @media (min-width: 900px) {
      width: 100%;
    }

    img {
      width: auto;
      height: 30px;
      -webkit-filter: invert(1);
      filter: invert(1);
    }
  }
}
</style>
