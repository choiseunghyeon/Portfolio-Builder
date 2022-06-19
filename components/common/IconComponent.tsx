import React from "react"
import * as ReactIconSi from "react-icons/si"
import * as ReactIconFa from "react-icons/fa"
import * as MaterialIcon from "@mui/icons-material"
import { IconType } from "react-icons/lib"

function getIcon(iconName: string): IconType | MaterialIcon.SvgIconComponent | undefined {
  if (ReactIconSi[iconName]) return ReactIconSi[iconName]

  if (ReactIconFa[iconName]) return ReactIconFa[iconName]

  if (MaterialIcon[iconName]) return MaterialIcon[iconName]
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
