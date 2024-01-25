import { ref, computed } from "vue";

export function useSearch(items, searchQuery) {
  const filteredItems = computed(() => {
    if (!searchQuery.value) {
      return items.value;
    }
    return items.value.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return { filteredItems };
}
