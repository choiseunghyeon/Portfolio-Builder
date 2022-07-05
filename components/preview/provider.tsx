import Portfolio from "./portfolio/Portfolio"
import { BlockType } from "@type/block"
import Career from "./career/Career"
import Profile from "./profile/Profile"
import Project from "./project/Project"
import MarkDown from "./markdown/MarkDown"

type PreviewProviderType = {
  [key in BlockType]: any
}

export const previewProvider: PreviewProviderType = {
  Profile: Profile,
  Career: Career,
  Project: Project,
  Portfolio: Portfolio,
  MarkDown: MarkDown,
}
