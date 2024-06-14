<script setup>
import { StarIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

defineProps({
  idea: {
    type: Object,
    required: true
  }
})

const votedThumb = ref('')

const updateLikeCount = async (idea) => {
  const res = await fetch(`http://localhost:8000/api/ideas/${idea.id}/update_thumbs_count/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      thumbsUppCount: idea.thumbsUppCount,
      thumbsDownCount: idea.thumbsDownCount
    })
  })

  if (!res.ok) {
    toast.error('Something went wrong!')
    return
  }

  toast.success('Thanks for your feedback!')
}

const onThumbUp = async (idea) => {
  votedThumb.value = 'up' // optimistic update
  idea.thumbsUppCount += 1

  await updateLikeCount(idea)
}

const onThumbDown = async (idea) => {
  votedThumb.value = 'down'
  idea.thumbsDownCount += 1

  await updateLikeCount(idea)
}
</script>

<template>
  <div class="flex flex-col gap-4 bg-gray-700 p-4 w-full h-full rounded-md">
    <!-- Profile and Rating -->
    <div class="flex justify justify-between">
      <div class="flex gap-2">
        <div class="w-7 h-7 text-center rounded-full bg-red-500">
          {{ idea.userName.charAt(0) }}
        </div>
        <span>{{ idea.userName }}</span>
      </div>
      <div class="flex p-1 gap-1 text-orange-300">
        <!-- <StarIcon class="h-6 w-6 text-blue-500" />
        <StarIcon class="h-6 w-6 text-blue-500" />
        <StarIcon class="h-6 w-6 text-blue-500" />
        <StarIcon class="h-6 w-6 text-blue-500" /> -->
      </div>
    </div>

    <!-- <div>Gorgeous design! Even more responsive than the previous version. A pleasure to use!</div> -->
    <div>{{ idea.idea }}</div>

    <div class="flex justify-between">
      <span>{{ new Date(idea.created_at).toLocaleDateString() }}</span>
      <!-- <button class="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60">
        <ion-icon name="share-outline"></ion-icon> Share
      </button> -->
      <div class="flex gap-2">
        <div class="flex cursor-pointer" @click="() => onThumbUp(idea)">
          <HandThumbUpIcon
            class="h-6 w-6"
            :class="votedThumb === 'up' ? 'text-blue-500' : 'text-gray-500'"
          />

          {{ idea.thumbsUppCount }}
        </div>
        <div class="flex cursor-pointer" @click="() => onThumbDown(idea)">
          <HandThumbDownIcon
            class="h-6 w-6"
            :class="votedThumb === 'down' ? 'text-blue-500' : 'text-gray-500'"
          />
          {{ idea.thumbsDownCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
