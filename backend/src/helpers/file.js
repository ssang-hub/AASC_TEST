import { readJsonSync, writeJsonSync } from "fs-extra";

export const tokens = readJsonSync("./tokens.json");
export const updateToken = (tokens) =>
  writeJsonSync("./tokens.json", { ...tokens });
