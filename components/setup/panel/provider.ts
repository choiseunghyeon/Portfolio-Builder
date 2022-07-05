import { EN_TAB_VALUE, TabType } from "@type/tab"
import BlockPanel from "./BlockPanel"
import MiniMap from "./MiniMap"

// type IPanelProvider = {
//   [key in TabType]?: any
//   BlockPanel: any
// }
export const panelProvider = {
  MiniMap: MiniMap,
  Project: BlockPanel,
  Career: BlockPanel,
  Profile: BlockPanel,
  Portfolio: BlockPanel,
  MarkDown: BlockPanel,
}
