import { component$, Resource } from '@builder.io/qwik'
import { useEndpoint } from '@builder.io/qwik-city'
import ContentfulRichText from '../../../components/layout/ContentfulRichText'
import DetailHeadline from '../../../components/layout/DetailHeadline'
import FileDetails from '../../../components/layout/FileDetails'
import GalleryView from '../../../components/layout/GalleryView'
import NotFound from '../../../components/layout/NotFound'
import Panel from '../../../components/layout/Panel'
import PanelTitle from '../../../components/layout/PanelTitle'
import Project from '../../../components/layout/Project'
import GoBack from '../../../components/navigation/GoBack'
import ProjectsIcon from '../../../icons/ProjectsIcon'
import clsx from '../../../utils/clsx'
import { head, onGet } from '../../api/projects/[id]'

export { onGet, head }

export default component$(() => {
  const resource = useEndpoint<typeof onGet>()

  return (
    <Resource
      value={resource}
      onRejected={() => <NotFound />}
      onResolved={(project) => (
        <div>
          {!project ? (
            <NotFound />
          ) : (
            <>
              <Project>
                <PanelTitle id="title">{project.title}</PanelTitle>
                <Panel>
                  <div className="py-2.5 px-5 tracking-wide">
                    <section>
                      <DetailHeadline id="details">Details:</DetailHeadline>
                      <FileDetails {...project} />
                    </section>
                    <section>
                      <DetailHeadline id="description">
                        Description:
                      </DetailHeadline>
                      <div className="mt-2 px-4 font-plain text-xl tracking-wide">
                        <ContentfulRichText json={project?.description?.json} />
                      </div>
                    </section>
                    <section>
                      <DetailHeadline id="tech">Tech Specs:</DetailHeadline>
                      <ul className="list-none p-2">
                        {project.tech.map((item, idx) => (
                          <li
                            className={clsx(
                              'px-2 font-plain text-xl',
                              idx % 2 ? 'bg-primary-900' : 'bg-transparent'
                            )}
                            key={item}
                          >
                            <ProjectsIcon className="mr-3 align-middle" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                    {project.snapshotsCollection.items.length > 0 ? (
                      <GalleryView
                        snapshots={project.snapshotsCollection!.items}
                      />
                    ) : null}
                  </div>
                </Panel>
              </Project>
              <GoBack href="/projects" title="projects" />
            </>
          )}
        </div>
      )}
    />
  )
})
