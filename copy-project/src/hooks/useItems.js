import { ref } from "vue";

export function useItems() {
  const items = ref([]);

  const setItems = (newItems) => {
    items.value = newItems;
  };

  return { items, setItems };
}
