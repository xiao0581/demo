<template>
  <div class="homecontainer">
    <p class="hometitle">Warm memories start here.</p>
    <q-btn class="homebutton" unelevated rounded label="+ Create an event" />
  </div>

  <div class="events-section">
    <h2>Upcoming Events</h2>
    <div class="event-card" v-for="event in events" :key="event.id" @click="goToEvent(event.id)">
      <div class="event-card-image">
        <q-img :src="event.image" alt="Wedding image" />
      </div>
      <div class="event-card-content">
        <h3 class="event-title">{{ event.name }}</h3>
        <div class="event-details">
          <p class="event-time"><q-icon name="schedule" /> {{ event.date }}</p>
          <p class="event-location"><q-icon name="place" /> {{ event.location }}</p>
        </div>
        <div class="event-guests">
          <div class="guest-avatars">
            <q-avatar v-for="guest in event.guests.slice(0, 5)" :key="guest.id" size="32px">
              <q-img :src="guest.avatar" />
            </q-avatar>
            <span class="additional-guests" v-if="event.guests.length > 5"
              >+{{ event.guests.length - 5 }}</span
            >
          </div>
          <p class="all-guests">View all guests ></p>
        </div>
        <q-btn
          unelevated
          rounded
          class="preview-button"
          label="Catch the celebration vibe with a quick preview"
          icon="arrow_forward"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEventStore } from '../stores/eventstores'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const eventStore = useEventStore()
    const router = useRouter()

    const events = eventStore.events.map((event) => ({
      ...event,
      guests: event.guests || [],
    }))
    console.log(events)
    const goToEvent = async (id: number) => {
      await router.push(`/event/${id}`)
    }

    return { events, goToEvent }
  },
})
</script>

<style scoped>
.homecontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(to bottom, rgba(74, 78, 105, 0.7), rgba(74, 78, 105, 0.7)),
    url('src/assets/pic/createBackgroundPic.png');
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 210px;
  padding-top: 4rem;
  gap: 1rem;
}

.hometitle {
  font-size: 1.7rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  z-index: 10;
  margin: 0;
}

.homebutton {
  background-color: #6a7bff;
  color: white;
  font-weight: bold;
  padding: 0.5rem 5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  z-index: 10;
  margin: 0;
  width: 350px;
  height: 10px;
}

.homebutton:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.events-section {
  margin: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.event-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-card-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.event-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card-content {
  padding: 16px;
}

.event-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.event-details {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #757575;
  margin-bottom: 12px;
}

.event-details q-icon {
  margin-right: 8px;
  color: #42a5f5;
}

.event-guests {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.guest-avatars {
  display: flex;
  align-items: center;
}

.q-avatar {
  margin-right: 4px;
}

.additional-guests {
  margin-left: 8px;
  font-size: 14px;
  color: #757575;
}

.all-guests {
  font-size: 14px;
  color: #42a5f5;
  cursor: pointer;
}

.preview-button {
  width: 100%;
  background-color: #42a5f5;
  color: white;
}

.preview-button:hover {
  background-color: #1e88e5;
}
</style>
