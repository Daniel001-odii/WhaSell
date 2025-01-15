<template>
    <NavbarView @open-filter="filter_menu = !filter_menu"/>
    <div class="flex flex-col md:flex-row gap-3 min-h-screen relative  mx-auto p-5">
        <!-- FILTERS -->
         <div :class="filter_menu ? ' flex':'hidden md:flex'" class="flex-col gap-4 md:sticky md:top-10 mt-6 bg-inherit">
        <!-- <div  class="flex-col gap-4 md:sticky md:top-10 mt-6 bg-inherit"> -->
            <h1 class=" font-bold text-2xl">Filters</h1>
            <div class=" flex flex-col gap-6 md:w-[300px] w-full">

                <!-- LOCATION -->
                
                
                <div class=" filter_box">
                    <span class="font-bold">Location</span>

                    <Popover v-model:open="open">
                        <PopoverTrigger as-child>
                        <Button
                            variant="outline"
                            role="combobox"
                            :aria-expanded="open"
                            class="bg-gray-100 justify-between text-lg p-2 w-full"
                        >
                            {{ value ? frameworks.find((framework) => framework.value === value)?.label : 'Select State...' }}

                            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent class="!w-full p-0 ">
                        <Command v-model="value">
                            <CommandInput placeholder="Search State" />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandList>
                            <CommandGroup>
                                <CommandItem
                                v-for="framework in frameworks"
                                :key="framework.value"
                                :value="framework.value"
                                @select="open = false"
                                >
                                <Check
                                    :class="cn(
                                    'mr-2 h-4 w-4',
                                    value === framework.value ? 'opacity-100' : 'opacity-0',
                                    )"
                                />
                                {{ framework.label }}
                                </CommandItem>
                            </CommandGroup>
                            </CommandList>
                        </Command>
                        </PopoverContent>
                    </Popover>

                </div>

                <!-- PRICE -->
                <div class=" filter_box">
                    <span class="font-bold">Price NGN</span>
                    <select class=" bg-gray-100 p-2 rounded-md">
                        <option>All Nigeria</option>
                    </select>
                </div>

                <!-- CONDITION -->
                <div class=" filter_box">
                    <span class="font-bold">Condition</span>
                    <select class=" bg-gray-100 p-2 rounded-md">
                        <option>Show All</option>
                    </select>
                </div>

                
                <!-- CONDITION -->
                <div class=" filter_box">
                    <span class="font-bold">Brand</span>
                    <select class=" bg-gray-100 p-2 rounded-md">
                        <option>Show All</option>
                    </select>
                </div>

                
                <!-- CONDITION -->
                <div class=" filter_box">
                    <span class="font-bold">Discount</span>
                    <select class=" bg-gray-100 p-2 rounded-md">
                        <option>Show All</option>
                    </select>
                </div>

                
                <!-- CONDITION -->
                <div class=" filter_box">
                    <span class="font-bold">Verified Sellers</span>
                    <select class=" bg-gray-100 p-2 rounded-md">
                        <option>Show All</option>
                    </select>
                </div>
            </div>
         </div>


         <!-- SEARCH RESULTS -->
          <div class=" flex flex-col gap-3 w-full md:p-3">
        <!-- Display Search Results -->
            <div v-if="loading_products" class=" flex flex-col gap-4">
                <div class=" flex flex-row gap-3 overflow-x-auto bg-white rounded-md p-3">
                    <div class="btn bg-gray-200 w-[120px] h-12"></div>
                    <div class="btn bg-gray-200 w-[120px] h-12"></div>
                    <div class="btn bg-gray-200 w-[120px] h-12"></div>
                </div>
                <div class=" mt-3">
                    <MasonryWall 
                    :items="items" 
                    :ssr-columns="1" 
                    :column-width="150" 
                    :gap="10">
                        <template #default="{ item, index }">
                            <div class="flex flex-col gap-2 rounded-3xl"
                                :style="{ height: `${item + 100}px`}"
                                style="background: url('../assets/images/whaLogo.svg');">
                                    <div class="rounded-md h-[100%] bg-gray-200"></div>
                                    <div class="rounded-md h-[15px] bg-gray-200"></div>
                                    <div class="rounded-md h-[30px] bg-gray-200"></div>
                            </div>
                        </template>
                    </MasonryWall> 
                </div>
            </div>
          <!-- results:  {{ results }} -->

        
            <div v-if="results?.length > 0" class="flex flex-col mt-4 gap-4">

                <div class=" flex flex-row gap-3 overflow-x-auto bg-white rounded-md p-3">
                    <button class=" btn bg-app_green text-white">Categories</button>
                </div>

                <div class=" flex flex-row flex-wrap justify-between items-center">
                    <p class=" font-bold">Search Results for "{{ $route.query.find }}" -
                        <span class=" text-sm bg-gray-300 p-1 font-thin px-4 text-nowrap"> {{ results.length }} product 
                            <span v-if="results.length > 1">s</span> found
                        </span>
                    </p>
                </div>
                
                <div class=" mt-6">
                    <MasonryWall 
                    :items="results"
                    :ssr-columns="1"
                    :column-width="200" :gap="10">
                        <template #default="{ item, index }">
                        <ProductCard class=" -mt-[15px]"
                            :has-liked-button="false"
                            :id="item._id"
                            :product_slug="item.slug"
                            :views="item.views"
                            :posted="item.createdAt"
                            :product_price="item.price.toLocaleString()"
                            :shop_name="item.shop.name"
                            :is_liked="checkLikes(item._id)"
                            @like-product="addProductToLikes(item._id)"
                            :image_url="item.images[0]"
                        >
                    </ProductCard>
                        </template>
                    </MasonryWall>
                </div>
            </div>

            <!-- ALTERNATE alternate_results FOR SEARCH -->
            <div v-else class="flex flex-col mt-4 gap-4">

                <div class=" flex flex-row gap-3 overflow-x-auto bg-white rounded-md p-3">
                    <button class=" btn bg-app_green text-white" disabled>Categories</button>
                </div>

                <div class=" flex flex-row flex-wrap justify-between items-center">
                    <p class=" font-bold text-orange-400">couldnt find exact match for "{{ $route.query.find }}" -
                        <span class=" text-sm bg-gray-300 p-1 font-thin px-4 text-black text-nowrap">  found other similar products  </span>
                    </p>
                </div>

                <div class=" mt-6">
                    <MasonryWall 
                    :items="alternate_results"
                    :ssr-columns="1"
                    :column-width="200" :gap="10">
                        <template #default="{ item, index }">
                        <ProductCard class=" -mt-[15px]"
                            :has-liked-button="false"
                            :id="item._id"
                            :product_slug="item.slug"
                            :views="item.views"
                            :posted="item.createdAt"
                            :product_price="item.price.toLocaleString()"
                            :shop_name="item.shop.name"
                            :is_liked="checkLikes(item._id)"
                            @like-product="addProductToLikes(item._id)"
                            :image_url="item.images[0]"
                        >
                    </ProductCard>
                        </template>
                    </MasonryWall>
                </div>
            </div>
        </div>

      <!-- <div v-else>
        <p>No results found.</p>
      </div> -->
    </div>
    <TheFooter/>
  </template>
  
  <script>
  import axios from 'axios';

  import ProductCard from '@/components/ProductCard.vue';
  import MasonryWall from '@yeger/vue-masonry-wall';

  import { Button } from '@/components/ui/button';
  import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'
import TheFooter from '@/components/TheFooter.vue';
import NavbarView from '@/components/NavbarView.vue';


  export default {
    name: "SearchResultsPageView",
    components: {
        MasonryWall,
        ProductCard,

        Command,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandList,
        Popover,
        PopoverContent,
        PopoverTrigger,
        Button,
        Check,
        ChevronsUpDown,
        TheFooter,
        NavbarView,
    },
    data() {
      return {
        filter_menu: false,
        cn,
        frameworks: [
        { value: 'next.js', label: 'Next.js' },
        { value: 'sveltekit', label: 'SvelteKit' },
        { value: 'nuxt', label: 'Nuxt' },
        { value: 'remix', label: 'Remix' },
        { value: 'astro', label: 'Astro' },
        ],
        results: [],
        alternate_results: [],
        loading_products: false,
        items: [50, 75, 75, 100, 50, 50, 75, 150, 125, 175, 50, 100, 125],
        liked_products: [],
      };
    },
    methods: {
        checkLikes(product_id){
            if(this.liked_products.includes(product_id)){
                return true;
            } else {
                return false;
            }
        },

        async searchProducts(keyword){
            try{
                this.loading_products = true;
                const response = await axios.get(`/products/search/product?keyword=${keyword}`);

                this.results = response.data.products;
               /*  setTimeout(()=>{
                    this.results = response.data.products;
                    this.loading_products = false;
                }, 3000); */

                if(this.results.length == 0){
                    this.alternate_results = response.data.alternate_products;
                }
                /* this.results = response.data.products;
                this.loading_products = false; */

                this.loading_products = false;
                
                console.log('search results: ', response);
            }catch(error){
                console.log("error searching: ", error);
                this.loading_products = false;
            }
        },


    },
    watch: {
        // Watch for changes in the 'find' query parameter
        '$route.query.find': {
        immediate: true, // Run the watcher when the component is created
            handler(newQuery) {
                this.searchProducts(newQuery);
            },
        },
    },
    mounted(){
        if(this.$route.query.find){
            this.searchProducts(this.$route.query.find);
        }
    },
    created() {
      // If results are passed through route state, use them; otherwise, fetch manually
      this.results = this.$route.state?.results || [];
    },
  };
  </script>
<style>
.filter_box{
    @apply bg-white rounded-lg flex flex-col gap-3 p-3 shadow-md
}
</style>
  