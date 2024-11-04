<template>
    
        <div class="flex flex-col gap-3 h-fit py-3">
            <div class="flex flex-row gap-3 flex-wrap">

                <!-- SHOP VISITORS -->
                <div class="stat-box">
                    <span class="text-sm font-bold">
                        <i class="bi bi-people-fill mr-2"></i>
                        <span>Shop Visitors</span>
                    </span>
                    <div class="font-bold text-3xl">{{ shop_analytics.views }}</div>
                    <div class="flex flex-row gap-3">
                        <span class="text-green-500">13%</span>
                        <span class="text-gray-500">+3.5k this week</span>
                    </div>
                </div>

                <!-- PRODUCT VIEWS -->
                <div class="stat-box">
                    <span class="text-sm font-bold">
                        <i class="bi bi-person-plus-fill mr-2"></i>
                        <span>Follower count</span>
                    </span>
                    <div class="font-bold text-3xl">{{ shop_analytics.followers_count }}</div>
                    <div class="flex flex-row gap-3">
                        <span class="text-green-500">13%</span>
                        <span class="text-gray-500">+3.5k this week</span>
                    </div>
                </div>

                <!-- LIKED PRODUCTS -->
                <div class="stat-box">
                    <span class="text-sm font-bold">
                        <i class="bi bi-archive-fill mr-2"></i>
                        <span>Sold Products</span>
                    </span>
                    <div class="font-bold text-3xl">{{ shop_analytics.sold_products }}</div>
                    <div class="flex flex-row gap-3">
                        <span class="text-green-500">13%</span>
                        <span class="text-gray-500">+3.5k this week</span>
                    </div>
                </div>

            </div>

            <!-- GROUP 2 -->
            <div class="flex flex-row flex-wrap gap-3 mt-12">
                <div class="stat-box-lg">
                    <div class="w-full flex justify-between">
                        <div>
                            <i class="bi bi-person-check-fill mr-2"></i>
                            <span>Followers</span>
                        </div>
                        <div>
                            <select class="border rounded-lg px-2">
                                <option>month</option>
                                <option>week</option>
                            </select>
                        </div>
                    </div>
                    <div class="font-bold text-3xl mt-3">{{  shop_analytics.followers_count }}</div>
                    <div class=" overflow-x-auto max-w-sm">
                        <!-- <Doughnut v-if="bubble_chart.labels" :data="bubble_chart" :options="bubble_chart.options" /> -->
                            <!-- {{ bubble_chart }} -->
                        <!-- <Bar v-if="bar_chart.labels" :data="bar_chart" :options="options" /> -->
                        <Line v-if="bar_chart.labels" :data="bar_chart" :options="options" />
                    </div>
                    <div class="flex flex-row gap-3 mt-3">
                        <span class="text-red-500"><i class="bi bi-graph-down-arrow mr-2"></i>13%</span>
                        <span class="text-gray-500">+3.5k this week</span>
                    </div>
                </div>

                <div class="stat-box-lg">
                    <div class="w-full flex justify-between">
                        <div>
                            <i class="bi bi-tag-fill mr-2"></i>
                            <span>Best Selling Category</span>
                        </div>
                        <div>
                            <select class="border rounded-lg px-2">
                                <option>month</option>
                                <option>week</option>
                            </select>
                        </div>
                    </div>
                    <div class="font-bold text-3xl mt-3">{{ shop_analytics.best_selling_product}}</div>
                    <div class="flex flex-row gap-3 mt-3">
                        <span class="text-green-500"><i class="bi bi-graph-up-arrow mr-2"></i>13%</span>
                        <span class="text-gray-500">20pcs sold this week</span>
                    </div>
                </div>
            </div>

        </div>
    
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import { Line } from 'vue-chartjs'

import axios from 'axios';
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement,
    PointElement,
    LineElement);

    export default {
        name: "AnalyticsView",
        components:{
            Bar,
            Doughnut,
            Line
        },
        data(){
            return{
                data: {
                    labels: ['January', 'February', 'March'],
                    datasets: [{ data: [40, 20, 12] }]
                },
                options: {
                    responsive: true
                },

               /*  bubble_chart: {
                    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                    datasets: [{
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10]
                    }],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                }, */
                bar_chart: {

                },
                bubble_chart: {
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                },
                shop_analytics: {},
                bubble_chat_loaded: false,
            }
        },

        methods:{
            async getShopByName(){
                try{
                    this.loading = true;
                    const response = await axios.get(`/shops/${this.$route.params.name}/full`);
                    this.shop = response.data.shop;
                    console.log("shop: ", response)
                    this.shop_id = response.data.shop._id;
                    // this.products = response.data.shop.products;
                    this.loading = false;
                    // get products...
                    this.getShopProducts(this.shop_id);
                    this.getShopGlips(this.shop_id);
                    this.addViewsToShop();
                }catch(error){
                    if(error.response.status == 404){
                        this.$router.push('/404');
                    }
                    console.log("error getting shop: ", error);
                    this.loading = false;
                }   
            },
            async getShopAnalytics(){
                try{
                    const response = await axios.get("/shops/data/analytics");
                    console.log("shop analytics: ", response);
                    this.shop_analytics = response.data.shop;
                    this.shop_analytics.followers_count = response.data.followers_count;
                    
                    /* this.bubble_chart.labels = response.data.chart_data.labels;
                    this.bubble_chart.datasets = response.data.chart_data.datasets;
                    this.bubble_chart.datasets.label = "Followers per month"; */

                    this.bar_chart.labels = response.data.chart_data.labels;
                    this.bar_chart.datasets = response.data.chart_data.datasets;
                    this.bar_chart.datasets[0].label = "Monthly followers"
                    // this.bubble_chat_loaded = true;
                }catch(error){
                    console.log("error getting analytics: ", error);
                }
            }

        },
        created(){
            this.getShopAnalytics();
        }
    }
</script>

<style scoped>
    .stat-box{
        @apply bg-white rounded-lg p-8 gap-3 flex flex-col border hover:shadow-md cursor-pointer !h-fit w-full lg:w-fit md:min-w-[300px]
    }

    .stat-box-lg{
        @apply flex flex-col bg-white  border hover:shadow-md p-8 rounded-md grow !h-fit
    }
</style>