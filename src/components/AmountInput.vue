<template>
    <div>
      <input class=" outline-none"
        v-model="formattedAmount"
        @input="formatAmount"
        @blur="onBlur"
        @focus="onFocus"
        type="text"
        placeholder="Enter amount"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amount: '', // Stores the actual number value
        formattedAmount: '' // Stores the formatted value with commas
      };
    },
    methods: {
      formatAmount() {
        // Remove any non-digit characters except the decimal point
        let value = this.formattedAmount.replace(/[^\d]/g, '');
  
        // Format the number with commas
        this.formattedAmount = this.numberWithCommas(value);
        this.amount = value;
      },
      numberWithCommas(x) {
        // Format the number with commas
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      onBlur() {
        // Optional: If you want to reset the amount on blur
        if (this.amount) {
          this.formattedAmount = this.numberWithCommas(this.amount);
        }
      },
      onFocus() {
        // Optional: If you want to clear formatting when the input is focused
        this.formattedAmount = this.amount;
      }
    }
  };
  </script>
  
  <style scoped>

  </style>
  