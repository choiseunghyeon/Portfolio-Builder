import React from "react"
// import * as ReactIconSi from "react-icons/si"
// import * as ReactIconFa from "react-icons/fa"
import {
  Add,
  Settings,
  Menu,
  Inbox,
  Person,
  ArrowDropDown,
  ArrowBack,
  Create,
  ChatBubble,
  ArrowForward,
  Star,
  StarBorder,
  MoreHoriz,
  LocalPhone,
  Email,
  DragIndicator,
  Delete,
  FolderShared,
  ContentCopy,
  PersonOutline,
  Computer,
  Cancel,
  Home,
  Code,
  Lightbulb,
  Timeline,
  Language,
} from "@mui/icons-material"
import { IconType } from "react-icons/lib"

const Icons = {
  Add,
  Settings,
  Menu,
  Inbox,
  Person,
  ArrowDropDown,
  ArrowBack,
  Create,
  ChatBubble,
  ArrowForward,
  Star,
  StarBorder,
  MoreHoriz,
  LocalPhone,
  Email,
  DragIndicator,
  Delete,
  FolderShared,
  ContentCopy,
  PersonOutline,
  Computer,
  Cancel,
  Home,
  Code,
  Lightbulb,
  Timeline,
  Language,
}
function getIcon(iconName: string): IconType | any | undefined {
  // if (ReactIconSi[iconName]) return ReactIconSi[iconName]

  // if (ReactIconFa[iconName]) return ReactIconFa[iconName]

  if (Icons[iconName]) return Icons[iconName]
}

interface IconComponentProps {
  icon: string
  fontSize?: string
  href?: string
  dataTestId?: string
}

function IconComponent({ icon, href, fontSize, dataTestId }: IconComponentProps) {
  const Component = getIcon(icon)
  if (!Component) return null

  if (href) {
    return (
      <a
        data-testid={dataTestId}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "none",
          fontSize: fontSize,
          color: "inherit",
          marginBottom: "10px",
        }}>
        <Component />
      </a>
    )
  }

  return <Component style={{ fontSize: fontSize }} />
}

export default React.memo(IconComponent)
