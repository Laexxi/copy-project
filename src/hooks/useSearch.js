import { ref, computed } from "vue";

export function useSearch(items, searchQuery) {
  const filteredItems = computed(() =>
    filterItems(items.value, searchQuery.value)
  );
  const filterItems = (itemsToFilter, query) => {
    if (!query) {
      return itemsToFilter;
    }
    return itemsToFilter.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return { filteredItems, filterItems };
}
