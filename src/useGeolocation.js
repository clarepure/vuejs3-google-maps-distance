import { onUnmounted, onMounted, ref } from "vue";

// w/ using composition api, use composable function to reuse throughout components
export function useGeolocation() {
    // return reactive ref to determine that lat,lng of user
    const coords = ref({ latitude: 0, longitude: 0 })
    // to determine user location, use geolocation application - check to confirm it's supported
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    let watcher = null;
    // use geolocation watchPosition() which prompts a callback whenever users position changes
    onMounted(() => {
        if (isSupported) {
            watcher = navigator.geolocation.watchPosition(
                position => (coords.value = position.coords), // assign coords to ref
            )
        }
    })
    // clear watcher when component is unmounted to handle listener safely
    onUnmounted(() => {
        if(watcher) {
            console.log('watcher', watcher);
            navigator.geolocation.clearWatch(watcher);
        }
    })
    // return coordinates and display them
    return { coords, isSupported }
}