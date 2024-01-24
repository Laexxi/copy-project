import { ref, watchEffect } from "vue";

export function createEmptyArrays(tags) {
  const emptyArrays = ref({});

  watchEffect(() => {
    const newArrays = {};
    tags.forEach((tag) => {
      newArrays[tag] = [];
    });
    emptyArrays.value = newArrays;
  });
  return emptyArrays;
}
