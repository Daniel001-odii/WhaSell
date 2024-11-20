<template>
<div v-if="glips_modal == true" class="fixed h-screen w-full z-50 top-0 right-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
    <!-- <div v-if="true" class="fixed h-screen w-full z-50 top-0 right-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center"> -->
        <button class="absolute bg-red top-3 right-3 z-10" @click="closeModal()">
            <i class="bi bi-x-lg text-white text-2xl"></i>
        </button>

        <!-- VIDEO PREVIEW HERE -->
        <div class="glips-container border-red-500 w-full h-[100dvh] md:max-h-[800px] flex flex-col justify-start items-center gap-3 md:p-3">
            
            <div v-for="(glip, index) in glips" key="index" class="glips md:rounded-xl bg-black text-white min-h-[100%]  h-full w-full md:max-h-[1000px] md:max-w-[400px] flex justify-center items-center relative">
                <div :ref="'videoContainer-' + index" class="glips md:rounded-xl bg-black text-white min-h-[100%]  h-full w-full md:max-h-[1000px] md:max-w-[400px] flex justify-center items-center relative">

                    <button v-if="control_showing" @click="togglePlayPause" class="rounded-full justify-center items-center p-5 absolute bg-black bg-opacity-50">
                        <i
                        :class="isPlaying[index] ? ' bi-pause-fill' : 'bi-play-fill'"
                        class="bi text-white text-6xl"
                        ></i>
                    </button>
                    <!-- autoplay="true" loop -->
                    <video :ref="'videoElement-' + index"  loop
                        :id="`videoPlayer-${index}`"
                        @click="togglePlayPause(index)"
                        @timeupdate="updateProgress(index)"
                        class="video"
                        width="100%"    
                    >
                        <source :src="glip.video_url" type="video/mp4" />
                        Your browser does not support the video
                    </video>

                    <!-- GLIP ACTIONS -->
                    <div class="flex flex-col gap-4 bg-red-5 h-[200px] absolute right-5 text-2xl">
                        <button class="bg-app_light_green rounded-full p-2 text-app_green h-14 w-14 relative">
                            <i class="bi bi-shop"></i>
                            <i class="bi bi-plus-circle-fill absolute top-7 text-[20px] -right-0"></i>
                        </button>
                        <button>
                            <i class="bi bi-upload"></i>
                        </button>
                        <button>
                            <i class="bi bi-hand-thumbs-up"></i>
                        </button>
                        <button>
                            <i class="bi bi-three-dots"></i>
                        </button>
                        
                    </div>



                    <!-- GLIP TEXTS -->
                    <div class=" flex flex-col absolute left-5 right-5 bottom-5">
                        <!--<div class="w-[80%] flex flex-col gap-3">
                            <h1 class="font-bold text-2xl">{{ glip.name }}</h1>
                            <div>NGN {{ glip.price.toLocaleString()}}</div>
                            <div v-html="glip.description" style="overflow-wrap: break-word" class="text-sm w-full max-h-[300px] overflow-y-auto"></div>
                        </div> -->
                    
                        <button class="btn bg-app_green text-white w-full mt-5">Buy now</button>
                    </div>


                    <!-- GLIP PROGRESS SEEKER -->
                    <div class="absolute bottom-0 w-full">
                        <div
                            class="progress-bar-container bg-black bg-opacity-50 relative w-full h-[6px] cursor-pointer"
                            @mousedown="startDrag(index)"
                            @mousemove="dragSeek(index)"
                            @mouseup="stopDrag"
                            @mouseleave="stopDrag"
                            :id="`progressBar-${index}`"
                        >
                            <div class="progress-bar-bg absolute w-full h-full"></div>
                            <div class="progress-bar-fg bg-app_green absolute h-full w-[0%]" :style="{ width: progressPercentage[index] + '%' }"></div>
                            <div
                            class="thumb"
                            :style="{ left: progressPercentage[index] + '%' }"
                            >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
         
            
        </div>
    </div>

</template>

<script>
    export default {
        name: "GlipComponent",
        props: {
            glips_modal: Boolean,
            glips: Array,
        },

        data(){
            return{
                is_showing: this.glips_modal,
                isPlaying: [],
                currentTime: 0, // Current time of the video
                videoDuration: 0, // Total duration of the video
                dragging: false, // To track whether the user is dragging
                progressPercentage: [], // Progress in percentage (0 - 100)

                control_showing: true,
                observer: null,
            }
        },

        methods:{
            closeModal(){
                this.$emit('close-glip')
            },

            togglePlayPause(){
                this.$emit('toggle-play-pause');
            },

            updateProgress(){
                this.$emit('update-progress')
            },

            startDrag(){
                this.$emit('start-drag');
            },

            dragSeek(){
                this.$emit('drag-seek');
            },

            stopDrag(){
                this.$emit('stop-drag');
            },



            togglePlayPause(index) {
                const video = document.getElementById(`videoPlayer-${index}`);
                if (video.paused) {
                    video.play();
                    this.isPlaying[index] = true;
                } else {
                    video.pause();
                    this.isPlaying[index] = false;
                }
            },
            updateProgress(index) {
                if (!this.dragging && this.glips_modal) {
                    const video = document.getElementById(`videoPlayer-${index}`);
                    this.currentTime = video.currentTime;
                    this.progressPercentage[index] = (this.currentTime / video.duration) * 100;
                    if(this.progressPercentage[index] < 100 && !video.paused){
                        this.isPlaying[index] = true;
                    } else {
                        this.isPlaying[index] = false;
                    };
                }
            },
           /*  seekVideo(event, index) {
                const video = document.getElementById(`videoPlayer-${index}`);
                video.currentTime = event.target.value;
                this.currentTime = event.target.value;
            }, */
            startDrag(event, index) {
                this.dragging = true;
                this.dragSeek(event, index);
            },
            dragSeek(event, index) {
                if (this.dragging) {
                    const progressBar = document.getElementById(`progressBar-${index}`);
                    const rect = progressBar.getBoundingClientRect();
                    const offsetX = event.clientX - rect.left;
                    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
                    this.progressPercentage[index] = percentage;
                    this.seekTo(percentage, index);
                }
            },
            stopDrag() {
                this.dragging = false;
            },
            seekTo(percentage, index) {
                const video = document.getElementById(`videoPlayer-${index}`);
                video.currentTime = (percentage / 100) * video.duration;
                this.currentTime = video.currentTime;
                this.progressPercentage[index] = percentage;
            },

        },
        mounted() {
            let videos = document.querySelectorAll("video");
            videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    },
                    { threshold: 1 }
                );
                observer.observe(video);
            });
        }
    });
        },
        beforeDestroy() {
        // Disconnect the observer on component unmount
        if (this.observer) {
            this.observer.disconnect();
        }
        },
    }
</script>

<style scoped>
  .glips-container{
        overflow: auto;
        -webkit-scroll-snap-type: y mandatory;
        -ms-scroll-snap-type: y mandatory;
        scroll-snap-type: y mandatory;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }


    .glips-container::-webkit-scrollbar {
       display: none;
    }


    .glips{
        scroll-snap-align: start;
        background:  black;
        background-size: cover;
    }
</style>