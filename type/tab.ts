import { BlockType } from "./block";

export const enum EN_TAB_VALUE {
  Project = "Projet",
  Career = "Career",
  Profile = "Profile",
  Fold = "Fold",
  MiniMap = "MiniMap",
}

export type TabType = "MiniMap" | "Fold" | BlockType;
