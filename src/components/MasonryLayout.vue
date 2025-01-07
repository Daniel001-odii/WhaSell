<template>
    <div class="masonry" ref="masonryContainer">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :style="{ backgroundColor: item.color, height: item.height + 'px' }"
      >
        {{ item.content }}
      </div>
    </div>
  </template>
  
  <script>
  import Masonry from "masonry-layout";
  
  export default {
    name: "MasonryLayout",
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      // Initialize Masonry after DOM is rendered
      new Masonry(this.$refs.masonryContainer, {
        itemSelector: ".item",
        columnWidth: ".item",
        percentPosition: true,
        gutter: 15, // Adjust gutter for spacing
        horizontalOrder: true,
      });
    },
  };
  </script>
  
  <style>
  /* .masonry {
    margin: 0 auto;
  }
  
  .item {
    background-color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    color: #fff;
    margin-bottom: 15px;
  }
  
  .item:hover {
    transform: translateY(-10px);
  } */
  </style>
  