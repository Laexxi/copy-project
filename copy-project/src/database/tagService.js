import { db } from "./index";

export const tagService = {
  async addTag(tag) {
    return await db.tags.add(tag);
  },

  async getAllTags() {
    return await db.tags.toArray();
  },

  async updateTag(id, updatedTag) {
    return await db.tags.update(id, updatedTag);
  },

  async deleteTag(id) {
    return await db.tags.delete(id);
  },
};
