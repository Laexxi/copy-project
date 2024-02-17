import { db } from "./index";

export const tagService = {
  async addTag(tag) {
    return await db.tags.add(tag);
  },

  async getAllTags() {
    return await db.tags.toArray();
  },
};
