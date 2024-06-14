import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNewIdeaStore = defineStore('newIdea', () => {
  const userNameInput = ref('')
  const ideaInput = ref('')
  const optionsInput = ref('default')
  const thumbsUpCount = ref(0)
  const thumbsDownCount = ref(0)

  function incrementThumbsUp() {
    thumbsUpCount.value++
  }

  function incrementThumbsDown() {
    thumbsDownCount.value++
  }

  function updateUserNameInput(newUserName) {
    userNameInput.value = newUserName
  }

  function updateIdeaInput(newIdea) {
    ideaInput.value = newIdea
  }

  function updateOptionsInput(newOptions) {
    optionsInput.value = newOptions
  }

  return {
    userNameInput,
    ideaInput,
    optionsInput,
    thumbsUpCount,
    thumbsDownCount,
    incrementThumbsUp,
    incrementThumbsDown,
    updateUserNameInput,
    updateIdeaInput,
    updateOptionsInput
  }
})
