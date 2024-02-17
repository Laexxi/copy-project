import { db } from "./index";

export const itemService = {
  async addItem(item) {
    return await db.items.add(item);
  },

  async updateItem(id, changes) {
    return await db.items.update(id, changes);
  },

  async getItemsByTag(tag) {
    return await db.items.where({ tags: Dexie.anyOf([tag]) }).toArray();
  },
};
