<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

import { useNewIdeaStore } from '../stores/new-idea'
import { storeToRefs } from 'pinia'
import { useGeneralsStore } from '../stores/generals'

const newReviewStore = useNewIdeaStore()
const generalsStore = useGeneralsStore()
const { showNewIdeaForm } = storeToRefs(generalsStore)

const { userNameInput, ideaInput, optionsInput, thumbsUpCount, thumbsDownCount } =
  storeToRefs(newReviewStore)
const { updateUserNameInput, updateIdeaInput, updateOptionsInput } = newReviewStore

const noOptionsSelectedMsg = ref('')

defineProps({
  idea: {
    type: Object,
    required: true
  },
  refetchideas: {
    type: Function,
    required: true
  }
  // showNewIdeaForm: {
  //   type: Boolean,
  //   required: true
  // }
})

// handle form submission
const handleSubmit = async (e, refetch) => {
  e.preventDefault()

  // if no options selected, return
  if (optionsInput.value === 'default') {
    noOptionsSelectedMsg.value = 'Please select an option'
    return
  }

  try {
    const dataObj = {
      userName: 'Anonymous',
      thumbsUppCount: thumbsUpCount.value,
      thumbsDownCount: thumbsDownCount.value,
      idea: ideaInput.value,
      options: optionsInput.value
    }

    const res = await fetch('http://127.0.0.1:8000/api/ideas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    if (!res.ok) {
      throw new Error('There was an error creating the idea')
    }

    // clear inputs
    updateUserNameInput('')
    updateIdeaInput('')
    updateOptionsInput('default')

    // show toast
    toast.success('Idea created successfully')

    // refetch ideas
    refetch()

    // hide form
    showNewIdeaForm.value = false
  } catch (error) {
    console.log('error', error)
  }
}

const handleOptionsChange = (option) => {
  noOptionsSelectedMsg.value = ''
  optionsInput.value = option
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-6" @submit="handleSubmit($event, refetchideas)">
        <div>
          <!-- Options Select -->
          <label for="options" class="block text-sm font-medium leading-6">Options</label>
          <div class="mt-2">
            <select
              id="options"
              name="options"
              autocomplete="options"
              required
              class="block text-black w-full ps-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="handleOptionsChange($event.target.value)"
            >
              <option value="default" disabled selected>Select an option</option>
              <option value="employee-engagement">Employee Engagement</option>
              <option value="process-improvement">Process Improvement</option>
              <option value="new-product">New Product Ideas</option>
              <option value="technology-innovation">Technology and Innovation</option>
              <option value="other">Other</option>
            </select>
            <p class="text-red-500 text-xs mt-1">{{ noOptionsSelectedMsg }}</p>
          </div>
        </div>

        <div>
          <!-- Idea Input -->
          <label for="idea" class="block text-sm font-medium leading-6">Your Idea</label>
          <div class="mt-2">
            <textarea
              id="idea"
              name="idea"
              type="text"
              autocomplete="idea"
              placeholder="What's your idea?"
              required
              class="block text-black w-full ps-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="ideaInput"
            ></textarea>
          </div>
        </div>

        <div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit Idea
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
