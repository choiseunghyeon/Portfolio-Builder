import { EN_TAB_VALUE, TabType } from "@type/tab";
import Career from "./Career";
import MiniMap from "./MiniMap";
import Profile from "./Profile";
import Project from "./Project";

type IPanelProvider = {
  [key in TabType]?: any;
};
export const panelProvider: IPanelProvider = {
  MiniMap: MiniMap,
  Project: Project,
  Career: Career,
  Profile: Profile,
};
