import { INLINES } from '@contentful/rich-text-types'
import type { BlockOrInline, CONTENTFUL_JSON, Text } from '../../../types'
import { documentToReactComponents } from '../../../utils/richTextRender'
import OutsideLink from '../../navigation/OutsideLink'

const customMarkdownOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: BlockOrInline) => {
      const nodeContent = node.content?.[0] as Text
      const title = nodeContent?.value

      return (
        <OutsideLink
          showIcon
          ariaLabel={`Navigate to ${title} page`}
          href={node.data?.uri}
        >
          {title}
        </OutsideLink>
      )
    }
  }
}

export default function ContentfulRichText({ json }: CONTENTFUL_JSON) {
  return (
    <div className="markdown">
      {documentToReactComponents(json, customMarkdownOptions)}
    </div>
  )
}
