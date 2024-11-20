<template>
    <div ref="videoContainer" class="video-container">
      <video ref="videoElement" width="600" controls muted>
        <source src="path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        observer: null,
      };
    },
    mounted() {
      const videoContainer = this.$refs.videoContainer;
      const videoElement = this.$refs.videoElement;
  
      // Create the observer
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            // Play the video when the div is in view
            videoElement?.play();
          } else {
            // Pause the video when the div is out of view
            videoElement?.pause();
          }
        },
        { threshold: 0.5 } // Trigger when 50% of the div is visible
      );
  
      // Observe the video container
      if (videoContainer) {
        this.observer.observe(videoContainer);
      }
    },
    beforeDestroy() {
      // Disconnect the observer on component unmount
      if (this.observer) {
        this.observer.disconnect();
      }
    },
  };
  </script>
  
  <style>
  .video-container {
    /* Optional styles */
    margin: 50vh 0; /* Center it for testing */
  }
  </style>
  