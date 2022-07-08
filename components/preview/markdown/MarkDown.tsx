import { MARKDOWN_PREVIEW } from "@constants/testConstants"
import { IBaseProps } from "@type/preview"
import hljs from "highlight.js"
import { marked } from "marked"
import React from "react"

export interface IMarkDownProps extends IBaseProps {
  markdown: string
}

marked.setOptions({
  // langPrefix: "hljs language-",
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value
  },
})

function MarkDown({ markdown }: IMarkDownProps) {
  return (
    <div
      data-testid={MARKDOWN_PREVIEW}
      dangerouslySetInnerHTML={{
        __html: marked(markdown),
      }}></div>
  )
}

export default React.memo(MarkDown)
