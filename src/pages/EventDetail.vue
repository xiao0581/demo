<template>
  <q-page class="event-details-page">
    <div class="event-header">
      <q-btn flat round icon="arrow_back_ios" color="primary" class="back-btn" to="/" />
      <q-img
        :src="event?.image"
        alt="Event Banner"
        style="width: 100%; height: 200px; object-fit: cover"
      />
      <div class="event-info">
        <h1>{{ event?.name }}</h1>
        <p>{{ event?.date }} • {{ event?.location }}</p>
        <q-btn label="Edit Event" color="primary" class="edit-btn" />
      </div>
    </div>

    <div class="event-section">
      <h5>Our guests</h5>
      <q-list>
        <q-item
          v-for="guest in event?.guests"
          :key="guest.id"
          clickable
          @click="viewGuestProfile(guest)"
        >
          <q-item-section avatar>
            <q-avatar size="56px">
              <q-img :src="guest.avatar || '/assets/images/default-avatar.png'" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ guest.name }}</q-item-label>
            <q-item-label caption>{{ guest.role }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="event-section">
      <h2>Memories</h2>
      <div class="memories-grid">
        <q-img
          v-for="memory in event?.memories"
          :key="memory.id"
          :src="memory.url"
          :alt="memory.type"
          class="memory-item"
          @click="viewMemory(memory)"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEventStore } from '../stores/eventstores'

interface Guest {
  id: number
  name: string
  role: string
  avatar?: string
}

interface Memory {
  id: number
  type: string
  url: string
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const eventStore = useEventStore()

    const eventId = parseInt(route.params.id as string)

    const event = computed(() => eventStore.getEventById(eventId))

    const viewGuestProfile = (guest: Guest) => {
      alert(`Viewing profile of ${guest.name}`)
    }

    const viewMemory = (memory: Memory) => {
      alert(`Viewing memory: ${memory.url}`)
    }

    return { event, viewGuestProfile, viewMemory }
  },
})
</script>

<style scoped>
.event-details-page {
  display: flex;
  flex-direction: column;
}

.event-header {
  position: relative;
}

.event-info {
  padding: 16px;
  background-color: #ffffff;
}

.event-info h1 {
  margin: 8px 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.event-info p {
  color: #666;
  margin-bottom: 16px;
}

.edit-btn {
  margin-top: 8px;
}

.event-section {
  margin: 16px;
}

.event-section h2 {
  margin-bottom: 12px;
}

.memories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
}

.memory-item {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

.back-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  background: transparent;
  box-shadow: none;
  border: none;
  padding: 0;
}
</style>
