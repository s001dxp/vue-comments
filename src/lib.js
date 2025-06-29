// Export the main component for library usage
import Comments from './components/comments/comments.vue'

// Export the component as default for library builds
export default Comments

// Also export as named export for flexibility
export { Comments }

// Export composables for advanced usage
export { useComments, useEmojiPicker, useFileUpload } from './composables/useComments'

// Export store for those who want to use it
export { useCommentsStore } from './store'

