import { db } from "./index.js";

export const addItem = async (item) => {
  return await db.items.add(item);
};
