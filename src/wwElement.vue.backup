<template>
  <div 
    ref="containerRef"
    :class="cn(
      'flex',
      content.direction === 'vertical' && 'flex-col',
      content.direction === 'horizontal' && 'flex-row',
      content.customClass
    )"
    :style="containerStyle"
  >
    <!-- First panel -->
    <div
      ref="firstPanelRef"
      :class="cn(
        'overflow-hidden',
        content.firstPanelClass
      )"
      :style="firstPanelStyle"
    >
      <slot name="first">
        <div 
          v-if="content.firstPanelContent"
          class="h-full w-full p-4"
          v-html="content.firstPanelContent"
        />
      </slot>
    </div>

    <!-- Resizer handle -->
    <div
      ref="resizerRef"
      :class="cn(
        'group relative flex-shrink-0 select-none transition-colors',
        // Direction styles
        content.direction === 'horizontal' && 'w-1 cursor-col-resize hover:w-2',
        content.direction === 'vertical' && 'h-1 cursor-row-resize hover:h-2',
        // Variant styles
        content.variant === 'line' && 'bg-border',
        content.variant === 'handle' && 'bg-border',
        content.variant === 'invisible' && 'bg-transparent hover:bg-border/50',
        // Hover states
        'hover:bg-accent active:bg-accent',
        content.resizerClass
      )"
      @mousedown="startResize"
      @touchstart="startResize"
    >
      <!-- Handle visual indicator -->
      <div 
        v-if="content.variant === 'handle'"
        :class="cn(
          'absolute inset-0 flex items-center justify-center',
          content.direction === 'horizontal' && 'flex-col',
          content.direction === 'vertical' && 'flex-row'
        )"
      >
        <div 
          v-for="i in 3" 
          :key="i"
          :class="cn(
            'bg-muted-foreground/50 transition-colors group-hover:bg-foreground/50',
            content.direction === 'horizontal' && 'mb-0.5 h-1 w-0.5',
            content.direction === 'vertical' && 'mr-0.5 h-0.5 w-1'
          )"
        />
      </div>
      
      <!-- Resize tooltip -->
      <div
        v-if="content.showTooltip && isResizing"
        :class="cn(
          'absolute z-50 rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md',
          content.direction === 'horizontal' && 'left-2 top-1/2 -translate-y-1/2',
          content.direction === 'vertical' && 'left-1/2 top-2 -translate-x-1/2'
        )"
      >
        {{ Math.round(firstPanelSize) }}{{ content.direction === 'horizontal' ? 'px' : 'px' }}
      </div>
    </div>

    <!-- Second panel -->
    <div
      ref="secondPanelRef"
      :class="cn(
        'flex-1 overflow-hidden',
        content.secondPanelClass
      )"
      :style="secondPanelStyle"
    >
      <slot name="second">
        <div 
          v-if="content.secondPanelContent"
          class="h-full w-full p-4"
          v-html="content.secondPanelContent"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { cn } from './cn.js'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'resize', 'resizeStart', 'resizeEnd'])

// Reactive data
const containerRef = ref(null)
const firstPanelRef = ref(null)
const secondPanelRef = ref(null)
const resizerRef = ref(null)

const isResizing = ref(false)
const startPos = ref(0)
const startSize = ref(0)
const internalSize = ref(0)

// Computed properties
const firstPanelSize = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalSize.value,
  set: (value) => {
    const newValue = Math.max(content.value?.minSize || 0, Math.min(maxSize.value, value))
    
    if (props.modelValue !== undefined) {
      emit('update:modelValue', newValue)
    } else {
      internalSize.value = newValue
    }
  }
})

const maxSize = computed(() => {
  if (!containerRef.value) return Infinity
  
  const containerSize = content.value?.direction === 'horizontal' 
    ? containerRef.value.clientWidth 
    : containerRef.value.clientHeight
    
  return Math.min(
    content.value?.maxSize || Infinity,
    containerSize - (content.value?.minSecondPanelSize || 100)
  )
})

const containerStyle = computed(() => ({
  height: content.value?.height || '400px',
  width: content.value?.width || '100%'
}))

const firstPanelStyle = computed(() => {
  const size = firstPanelSize.value
  
  if (content.value?.direction === 'horizontal') {
    return {
      width: `${size}px`,
      minWidth: `${content.value?.minSize || 0}px`,
      maxWidth: `${maxSize.value}px`
    }
  } else {
    return {
      height: `${size}px`,
      minHeight: `${content.value?.minSize || 0}px`,
      maxHeight: `${maxSize.value}px`
    }
  }
})

const secondPanelStyle = computed(() => {
  const minSize = content.value?.minSecondPanelSize || 100
  
  if (content.value?.direction === 'horizontal') {
    return {
      minWidth: `${minSize}px`
    }
  } else {
    return {
      minHeight: `${minSize}px`
    }
  }
})

// Methods
const startResize = (event) => {
  if (content.value?.disabled) return
  
  event.preventDefault()
  isResizing.value = true
  
  const clientPos = event.touches ? event.touches[0] : event
  startPos.value = content.value?.direction === 'horizontal' ? clientPos.clientX : clientPos.clientY
  startSize.value = firstPanelSize.value
  
  emit('resizeStart', {
    size: startSize.value,
    direction: content.value?.direction
  })
  
  // Add event listeners
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize)
  document.addEventListener('touchend', stopResize)
  
  // Prevent text selection
  document.body.style.userSelect = 'none'
  document.body.style.pointerEvents = 'none'
  resizerRef.value.style.pointerEvents = 'auto'
}

const handleResize = (event) => {
  if (!isResizing.value) return
  
  const clientPos = event.touches ? event.touches[0] : event
  const currentPos = content.value?.direction === 'horizontal' ? clientPos.clientX : clientPos.clientY
  const delta = currentPos - startPos.value
  
  const newSize = startSize.value + delta
  firstPanelSize.value = newSize
  
  emit('resize', {
    size: firstPanelSize.value,
    delta,
    direction: content.value?.direction
  })
}

const stopResize = () => {
  if (!isResizing.value) return
  
  isResizing.value = false
  
  // Remove event listeners
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
  
  // Restore text selection
  document.body.style.userSelect = ''
  document.body.style.pointerEvents = ''
  resizerRef.value.style.pointerEvents = ''
  
  emit('resizeEnd', {
    size: firstPanelSize.value,
    direction: content.value?.direction
  })
}

// Public methods
const setSize = (size) => {
  firstPanelSize.value = size
}

const reset = () => {
  firstPanelSize.value = content.value?.defaultSize || 300
}

const collapse = () => {
  firstPanelSize.value = content.value?.minSize || 0
}

const expand = () => {
  firstPanelSize.value = content.value?.maxSize || maxSize.value
}

// Initialize size
const initializeSize = () => {
  if (props.modelValue === undefined && internalSize.value === 0) {
    internalSize.value = content.value?.defaultSize || 300
  }
}

// Watchers
watch(() => content.value?.defaultSize, (newSize) => {
  if (newSize && props.modelValue === undefined && internalSize.value === 0) {
    internalSize.value = newSize
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  nextTick(() => {
    initializeSize()
  })
})

onUnmounted(() => {
  // Clean up event listeners
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
})

// Expose methods
defineExpose({
  setSize,
  reset,
  collapse,
  expand,
  isResizing: readonly(isResizing),
  firstPanelSize: readonly(firstPanelSize)
})
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 