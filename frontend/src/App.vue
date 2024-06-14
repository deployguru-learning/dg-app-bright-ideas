<script setup>
import IdeaCard from './components/IdeaCard.vue'
import 'vue3-toastify/dist/index.css'

import { onMounted } from 'vue'
import { useGeneralsStore } from './stores/generals'
import { storeToRefs } from 'pinia'

const generalsStore = useGeneralsStore()
const { ideasList, filteredIdeas } = storeToRefs(generalsStore)

const fetchAndSetIdeas = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/ideas/')

    const ideas = await res.json()

    ideasList.value = ideas
    filteredIdeas.value = ideas
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  // console.log('Component is mounted!')
  fetchAndSetIdeas()
})

const refetchideas = () => {
  fetchAndSetIdeas()
}
</script>

<template>
  <IdeaCard msg="You did it" :ideasList="ideasList" :refetchideas="refetchideas" />
</template>

<style scoped></style>
