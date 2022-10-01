import { component$, Resource } from '@builder.io/qwik'
import { useEndpoint } from '@builder.io/qwik-city'
import DetailHeadline from '../../../components/layout/DetailHeadline'
import FileDetails from '../../../components/layout/FileDetails'
import NotFound from '../../../components/layout/NotFound'
import Panel from '../../../components/layout/Panel'
import PanelTitle from '../../../components/layout/PanelTitle'
import Project from '../../../components/layout/Project'
import GoBack from '../../../components/navigation/GoBack'
import { head, onGet } from '../../api/explorations/[id]'

export { onGet, head }

export default component$(() => {
  const resourceData = useEndpoint<typeof onGet>()

  return (
    <Resource
      value={resourceData}
      onRejected={() => <NotFound />}
      onResolved={(exploration) => (
        <div>
          {!exploration ? (
            <NotFound />
          ) : (
            <>
              <Project>
                <PanelTitle id="exploration-title">
                  {exploration?.title}
                </PanelTitle>
                <Panel>
                  <div className="py-2.5 px-5 tracking-wide">
                    <DetailHeadline id="details">Details:</DetailHeadline>
                    <section>
                      <FileDetails
                        active
                        location={`https://${exploration.sandboxId}.csb.app/`}
                        source={`https://codesandbox.io/s/${exploration.sandboxId}`}
                        status="In Orbit"
                      />
                    </section>
                    <section>
                      <DetailHeadline id="description">
                        Description:
                      </DetailHeadline>
                      <div
                        className="mt-2 px-4 font-plain text-xl tracking-wide"
                        data-testid="exploration-description"
                      >
                        {exploration.preview.description}
                      </div>
                    </section>
                    <section>
                      <DetailHeadline id="playground">
                        Playground:
                      </DetailHeadline>
                      <div className="my-5 px-2.5 font-plain">
                        <iframe
                          src={`https://codesandbox.io/embed/${exploration.sandboxId}?codemirror=1&fontsize=14&hidenavigation=1&view=preview&hidedevtools=1&theme=dark`}
                          title={exploration?.title}
                          className="h-[31.25rem] w-full overflow-hidden rounded border-0"
                          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        />
                      </div>
                    </section>
                  </div>
                </Panel>
              </Project>
              <GoBack href="/explorations" title="Explorations" />
            </>
          )}
        </div>
      )}
    />
  )
})
