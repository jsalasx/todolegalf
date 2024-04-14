<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <button class="close-modal" @click="close">Cerrar</button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:isVisible', false);
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  z-index: 1001;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>