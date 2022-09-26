import NotFoundIcon from '../../../icons/NotfoundIcon'
import GoBack from '../../navigation/GoBack'
import Panel from '../Panel'
import PanelTitle from '../PanelTitle'
import Project from '../Project'

export default function NotFound() {
  return (
    <div>
      <Project>
        <PanelTitle id="file-not-found" data-testid="panel-title">
          file not found
        </PanelTitle>
        <Panel>
          <div className="flex h-[44rem] flex-col items-center justify-center">
            <NotFoundIcon className="mb-10 text-ginormous" />
            <div className="py-2.5 px-5 tracking-wide">
              Unable to locate the requested file.
            </div>
          </div>
        </Panel>
      </Project>
      <GoBack href="/" title="home" />
    </div>
  )
}
