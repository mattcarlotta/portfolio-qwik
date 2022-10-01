import { component$, Resource, useResource$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import ContentfulRichText from '../../components/layout/ContentfulRichText'
import DetailHeadline from '../../components/layout/DetailHeadline'
import Image from '../../components/layout/Image'
import Info from '../../components/layout/Info'
import Panel from '../../components/layout/Panel'
import PanelTitle from '../../components/layout/PanelTitle'
import Project from '../../components/layout/Project'
import GoBack from '../../components/navigation/GoBack'
import OutsideLink from '../../components/navigation/OutsideLink'
import CodesandboxIcon from '../../icons/CodesandboxIcon'
import GithubIcon from '../../icons/GithubIcon'
import LocationIcon from '../../icons/LocationIcon'
import MailIcon from '../../icons/MailIcon'
import RankIcon from '../../icons/RankIcon'
import StackOverflowIcon from '../../icons/StackOverflowIcon'
import StarFilledIcon from '../../icons/StarFilledIcon'
import StarOutlineIcon from '../../icons/StarOutlineIcon'
import StatusIcon from '../../icons/StatusIcon'
import clsx from '../../utils/clsx'
import { BackgroundPage } from '../api/background'

export default component$(() => {
  const resourceData = useResource$<BackgroundPage>(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/background`)

    if (!res.ok) {
      throw Error('No background info was found')
    }

    const data = await res.json()

    return data
  })

  const iconClassName = 'mr-2 align-middle text-xl'

  return (
    <Resource
      value={resourceData}
      onRejected={(err) => <div>{String(err?.message)}</div>}
      onResolved={(background) => (
        <div>
          <Project>
            <PanelTitle id="background-title">{background.title}</PanelTitle>
            <Panel>
              <div className="p-5 tracking-wide">
                <section>
                  <div className="mt-2 flex flex-col items-center justify-center overflow-hidden rounded border border-solid border-primary-600 bg-primary-700 py-4">
                    <Image
                      className="rounded"
                      url={background.profileImage.url}
                      alt={background.profileImage.description}
                      height={150}
                      width={150}
                      contentType={background.profileImage.contentType}
                    />
                  </div>
                  <DetailHeadline id="details">Details:</DetailHeadline>
                  <div className="pl-3 font-plain text-md">
                    <Info className="text-lime-500">
                      <StatusIcon className={iconClassName} />
                      In Orbit Circa September 2016
                    </Info>
                    <Info>
                      <LocationIcon className={iconClassName} />
                      {background.location}
                    </Info>
                    <Info>
                      <RankIcon className={iconClassName} />
                      {background.rank}
                    </Info>
                    <Info>
                      <MailIcon className={iconClassName} />
                      <OutsideLink
                        ariaLabel="Click to send me an email."
                        href="mailto:matt@mattcarlotta.com"
                      >
                        {background.email}
                      </OutsideLink>
                    </Info>
                    <Info>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        className={iconClassName}
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Linkedin Profile</title>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <OutsideLink
                        ariaLabel="Click to visit my Linkedin profile."
                        href="https://www.linkedin.com/in/mattcarlotta/"
                      >
                        LinkedIn
                      </OutsideLink>
                    </Info>
                    {[
                      {
                        Icon: GithubIcon,
                        id: 'github',
                        title: 'Github',
                        href: 'https://github.com/mattcarlotta/'
                      },
                      {
                        Icon: StackOverflowIcon,
                        id: 'stackoverflow',
                        title: 'Stackoverflow',
                        href: 'https://stackoverflow.com/users/7376526/matt-carlotta/'
                      },
                      {
                        Icon: CodesandboxIcon,
                        id: 'codesandbox',
                        title: 'CodeSandBox',
                        href: 'https://codesandbox.io/u/mattcarlotta/sandboxes/'
                      }
                    ].map(({ Icon, id, title, href }) => (
                      <Info>
                        <Icon className={iconClassName} />
                        <OutsideLink
                          ariaLabel={`Navigate to my ${id} page`}
                          href={href}
                          showIcon
                        >
                          {title}
                        </OutsideLink>
                      </Info>
                    ))}
                  </div>
                </section>
                <section>
                  <DetailHeadline id="brief">Brief:</DetailHeadline>
                  <div className="pl-4 font-plain text-xl tracking-wide">
                    <ContentfulRichText json={background.description.json} />
                  </div>
                </section>
                <section>
                  <DetailHeadline id="tech-specs">Tech Specs:</DetailHeadline>
                  {background.tech.data.map((background, index) => (
                    <div>
                      <div className="font-plain text-xl leading-relaxed">
                        <div
                          className={clsx(
                            'px-2.5 text-center sm:flex sm:items-center',
                            index % 2 ? 'bg-primary-900' : 'bg-transparent'
                          )}
                        >
                          <p className="text-primary-25 sm:flex sm:flex-1">
                            {background.technology}
                          </p>
                          <p className="text-primary-25 sm:flex sm:flex-1 sm:justify-end">
                            {Array.from({ length: 5 }, (_, i) =>
                              i < background.level ? (
                                <StarFilledIcon className="mr-2 align-middle text-xl text-primary-25" />
                              ) : (
                                <StarOutlineIcon className="mr-2 align-middle text-xl text-gray" />
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
                <section>
                  <DetailHeadline id="formal-education">
                    Education:
                  </DetailHeadline>
                  <p className="px-4 pt-2 font-plain text-xl">
                    San Jose State University | 2005-2012 | 3.5GPA
                  </p>
                </section>
                <section>
                  <DetailHeadline id="online-education">
                    Online Education:
                  </DetailHeadline>
                  <ul className="list-none px-2">
                    {background.education.data.map(({ title, url }, index) => (
                      <li
                        className={clsx(
                          index % 2 ? 'bg-primary-900' : 'bg-transparent'
                        )}
                        key={title}
                      >
                        <div className="px-2.5 font-plain text-xl leading-relaxed">
                          <OutsideLink
                            ariaLabel={`Navigate to ${title}`}
                            href={url}
                            showIcon
                          >
                            {title}
                          </OutsideLink>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </Panel>
          </Project>
          <GoBack href="/" title="Home" />
        </div>
      )}
    />
  )
})

export const head: DocumentHead = {
  title:
    'Background - Learn about my journey on how I became a fullstack software engineer | Matt Carlotta '
}
