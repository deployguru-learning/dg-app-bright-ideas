<script setup>
import ReView from './Idea.vue'
import NewIdeaForm from './NewIdeaForm.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { useGeneralsStore } from '../stores/generals'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const generalsStore = useGeneralsStore()
const { showNewIdeaForm, ideasList, filteredIdeas } = storeToRefs(generalsStore)

const searchInput = ref('')

defineProps({
  msg: {
    type: String,
    required: true
  },
  refetchideas: {
    type: Function,
    required: true
  }
})

const handleSearch = () => {
  const filtered = ideasList.value.filter((idea) => {
    return (
      idea.idea.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      idea.userName.toLowerCase().includes(searchInput.value.toLowerCase())
    )
  })

  filteredIdeas.value = filtered
}
</script>

<template>
  <div class="greetings max-w-7xl m-auto">
    <div class="flex justify-center items-center min-h-screen">
      <div class="flex flex-col gap-2 p-5">
        <div class="flex justify-center items-center">
          <h1 class="text-lg" v-if="ideasList.length === 0">Add First Idea</h1>
          <!--h1 class="text-lg" v-else>Ideas</h1-->
          <div class="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md" v-if="ideasList.length">
              <div class="flex items-center">
                  <MagnifyingGlassIcon class="py-4 px-3 w-16 h-16" />
                  <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Search Idea"
                      class="p-2 bg-transparent focus:outline-none w-full"
                      v-model="searchInput"
                      @keyup="handleSearch"
                  />
              </div>
          </div>
      </div>


        <div class="flex justify-center">
          <button
            class="mt-10 p-2 px-4 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60 text-white"
            @click="showNewIdeaForm = !showNewIdeaForm"
          >
            {{ showNewIdeaForm ? 'Cancel' : 'Add Idea' }}
          </button>
        </div>

        <div v-if="showNewIdeaForm">
          <NewIdeaForm :refetchideas="refetchideas" :showNewIdeaForm="showNewIdeaForm" />
        </div>

        <!-- Item Container -->
        <ul class="flex flex-wrap justify-center gap-4 my-14">
          <li v-for="idea in filteredIdeas" :key="idea.id" class="max-w-xs w-full rounded-md">
            <ReView :idea="idea" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
