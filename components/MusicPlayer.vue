<script setup>
import { ref, computed, onMounted } from "vue";
import axios from 'axios';

// Define folder path (files are in /public/music/)
const audioFolder = "/music/";
const audioExtensions = [".mp3", ".wav", ".ogg"];

// Dynamically load tracks from public/tracks.json
const tracks = ref([]);
const audio = ref(null);
const currentTrackIndex = ref(0);
const isPlaying = ref(false);
const progress = ref(0);
const volume = ref(1);
const duration = ref(0);
const currentTime = ref(0);

// Get current track
const currentTrack = computed(() => tracks.value[currentTrackIndex.value]);

// Fetch track list on mount
onMounted(async () => {
  console.log("Component mounted");
  
  try {
    const response = await axios.get('/tracks.json');
    tracks.value = response.data;
    console.log("Tracks loaded:", tracks.value);
    
    if (tracks.value.length > 0) {
      loadTrack();
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
  }
});

// 🎵 Load selected track
const loadTrack = () => {
  if (!audio.value || !currentTrack.value) return;
  
  audio.value.src = currentTrack.value.src;
  audio.value.load();
  audio.value.onloadedmetadata = () => {
    duration.value = audio.value.duration;
    console.log("Duration loaded:", duration.value);
  };
  audio.value.ontimeupdate = updateProgress;
  audio.value.onended = nextTrack;
};

// ▶️ Play/Pause
const togglePlay = async () => {
  try {
    if (!audio.value) return;

    if (isPlaying.value) {
      await audio.value.pause();
    } else {
      await audio.value.play();
    }

    isPlaying.value = !isPlaying.value;
    console.log("Toggle play:", isPlaying.value);
  } catch (error) {
    console.error("Error toggling play:", error);
  }
};

// ⏩ Next Track
const nextTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.value.length;
  loadTrack();
  
  if (isPlaying.value) {
    audio.value.play();
  }
};

// ⏪ Previous Track
const prevTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.value.length) % tracks.value.length;
  loadTrack();
  
  if (isPlaying.value) {
    audio.value.play();
  }
};

// 📍 Seek in track
const seek = (event) => {
  const seekTime = (event.target.value / 100) * duration.value;
  audio.value.currentTime = seekTime;
};

// 🔊 Update progress
const updateProgress = () => {
  currentTime.value = audio.value.currentTime;
  progress.value = (audio.value.currentTime / audio.value.duration) * 100;
};

// 🔉 Adjust volume
const adjustVolume = (event) => {
  volume.value = event.target.value;
  audio.value.volume = volume.value;
};
</script>
<template>
  <div class="player">
    <!-- 🎵 Track Info -->
    <div class="track-info">
      <h2>{{ currentTrack?.title }}</h2>
    </div>

    <!-- 📍 Progress Bar -->
    <input type="range" min="0" max="100" :value="progress" 
           @input="seek" class="progress-bar" />

    <!-- ⏯️ Controls -->
    <div class="controls">
      <button @click="prevTrack" class="icon-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.59 17L10 15.59L6.41 12L10 8.41L8.59 7L4 12L8.59 17Z" fill="currentColor"/>
          <path d="M13.59 17L15 15.59L11.41 12L15 8.41L13.59 7L9 12L13.59 17Z" fill="currentColor"/>
        </svg>
      </button>
      <button @click="togglePlay" class="icon-button p-2">
        <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5V19L17.99 12L8 5Z" fill="currentColor"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5V19H12V5H8Z" fill="currentColor"/>
          <path d="M16 5V19H20V5H16Z" fill="currentColor"/>
        </svg>
      </button>
      <button @click="nextTrack" class="icon-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 7L14 8.41L17.59 12L14 15.59L15.41 17L20 12L15.41 7Z" fill="currentColor"/>
          <path d="M10 7L8.59 8.41L12.18 12L8.59 15.59L10 17L14.6 12L10 7Z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <!-- 🔉 Volume -->
    <input type="range" min="0" max="1" step="0.1" :value="volume" 
           @input="adjustVolume" class="progress-bar" />
    
    <!-- Audio Element for debugging -->
    <audio ref="audio"></audio>
  </div>
</template>

<style scoped>
.player {
  background: #1a1a1a;
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 100%;
}

.track-info h2 {
  font-size: 18px;
}

.progress-container {
  position: relative;
  width: 100%;
  margin: 10px 0;
}

.progress-bar {
  width: 100%;
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
  background-color: #333;
  height: 4px;
  border-radius: 2px;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none; /* Remove default thumb styling */
  appearance: none;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.progress-indicator {
  position: absolute;
  top: -3px;
  left: 0;
  width: 0;
  height: 10px;
  background-color: #fff;
  border-radius: 2px;
  transition: left 0.2s ease-in-out;
}

.controls .icon-button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>