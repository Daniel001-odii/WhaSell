<template>
    
        <div class="flex flex-col gap-3 h-fit py-3">
            <div class="flex flex-row gap-3 flex-wrap">

                <!-- SHOP VISITORS -->
                <div class="stat-box">
                    <span class="text-sm font-bold">
                        <i class="bi bi-people-fill mr-2"></i>
                        <span>Shop Visitors</span>
                    </span>
                    <div class="font-bold text-3xl">56,000</div>
                    <div class="flex flex-row gap-3">
                        <span class="text-green-500">13%</span>
                        <span class="text-gray-500">+3.5k this week</span>
                    </div>
                </div>

                <!-- PRODUCT VIEWS -->
                <div class="stat-box">
                    <span class="text-sm font-bold">
                        <i class="bi bi-eye-fill mr-2"></i>
                        <span>Product Views</span>
                    </span>
                    <div class="font-bold text-3xl">56,000</div>
                    <div class="flex flex-row gap-3">
                        <span class="text-green-500">13%</span>
                        <span class="text-gray-500">+3.5k this week</span>
                    </div>
                </div>

                <!-- LIKED PRODUCTS -->
                <div class="stat-box">
                    <span class="text-sm font-bold">
                        <i class="bi bi-hand-thumbs-up-fill mr-2"></i>
                        <span>Product Views</span>
                    </span>
                    <div class="font-bold text-3xl">56,000</div>
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
                            <span>Follower count</span>
                        </div>
                        <div>
                            <select class="border rounded-lg px-2">
                                <option>week</option>
                            </select>
                        </div>
                    </div>
                    <div class="font-bold text-3xl mt-3">2,456</div>
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
                                <option>week</option>
                            </select>
                        </div>
                    </div>
                    <div class="font-bold text-3xl mt-3">Fashion & Apparel</div>
                    <div class="flex flex-row gap-3 mt-3">
                        <span class="text-green-500"><i class="bi bi-graph-up-arrow mr-2"></i>13%</span>
                        <span class="text-gray-500">20pcs sold this week</span>
                    </div>
                </div>
            </div>

        </div>
    
</template>

<script>
    export default {
        name: "AnalyticsView",
        components:{

        },
        data(){
            return{

            }
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .stat-box{
        @apply bg-white rounded-lg p-8 gap-3 flex flex-col border hover:shadow-md cursor-pointer w-full md:w-fit md:min-w-[300px]
    }

    .stat-box-lg{
        @apply flex flex-col bg-white  border hover:shadow-md p-8 rounded-md grow
    }
</style>