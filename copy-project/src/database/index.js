import Dexie from "dexie";

export const db = new Dexie("ItemListDatabase");
db.version(1).stores({
  items: "++id,name,selected,tags,path,copyMode",
  tags: "++id,tag,directory,copyMode",
  itemTags: "++id, itemId, tagId",
});
