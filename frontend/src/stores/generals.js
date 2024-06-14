import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralsStore = defineStore('generals', () => {
  const showNewIdeaForm = ref(false)
  const ideasList = ref([])
  console.log('ideasList', ideasList)
  const filteredIdeas = ref([])

  function toggleShowNewIdeaForm() {
    showNewIdeaForm.value = !showNewIdeaForm.value
  }

  return {
    showNewIdeaForm,
    toggleShowNewIdeaForm,
    ideasList,
    filteredIdeas
  }
})
