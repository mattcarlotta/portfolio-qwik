/* istanbul ignore file */
import type { Children } from '../../../types'
import Bars from '../Bars'
import PanelBody from '../PanelBody'

const Panel = ({ children }: Children) => (
  <div className="text-primary-2 mb-16 w-full overflow-hidden rounded-b-sm bg-primary-700 font-bold">
    <PanelBody>
      <Bars />
      {children}
    </PanelBody>
  </div>
)

export default Panel
