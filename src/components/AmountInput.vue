<template>
    <div class="flex flex-row items-center form-input gap-3 text-gray-400">NGN
      <input class=" outline-none text-black bg-transparent"
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
    name: 'AmountInput',
    props: {
      modelValue: {
        type: [String, Number],
        required: true
      },
      placeholder: {
        type: String,
        default: 'Enter amount'
      }
    },
    data() {
      return {
        amount: this.modelValue ? this.modelValue.toString().replace(/[^\d]/g, '') : '',
        formattedAmount: this.numberWithCommas(this.modelValue)
      };
    },
    methods: {
      formatAmount() {
        let value = this.formattedAmount.replace(/[^\d]/g, '');
        this.formattedAmount = this.numberWithCommas(value);
        this.amount = value;
        this.$emit('update:modelValue', this.amount);
      },
      numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      onBlur() {
        if (this.amount) {
          this.formattedAmount = this.numberWithCommas(this.amount);
        }
      },
      onFocus() {
        this.formattedAmount = this.amount;
      }
    },
    watch: {
      modelValue(newVal) {
        this.amount = newVal ? newVal.toString().replace(/[^\d]/g, '') : '';
        this.formattedAmount = this.numberWithCommas(this.amount);
      }
    }
  };
  </script>
  
  
  <style scoped>

  </style>
  