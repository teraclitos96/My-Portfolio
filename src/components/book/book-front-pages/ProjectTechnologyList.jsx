import { FaAws, FaBootstrap, FaCss3Alt, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'
import { MdCable, MdDashboardCustomize, MdWidgets } from 'react-icons/md'
import { RiVuejsFill } from 'react-icons/ri'
import { SiAmazondynamodb, SiMicrosoft, SiReactrouter } from 'react-icons/si'
import { Tooltip } from 'react-tooltip'

const technologyIcons = {
  AWS: FaAws,
  Bootstrap: FaBootstrap,
  CSS3: FaCss3Alt,
  DynamoDB: SiAmazondynamodb,
  'Fluent UI': MdWidgets,
  HTML5: FaHtml5,
  JavaScript: IoLogoJavascript,
  'Office.js': SiMicrosoft,
  React: FaReact,
  'React Router': SiReactrouter,
  'Vue 2': FaVuejs,
  Vuex: RiVuejsFill,
  Vuexy: MdDashboardCustomize,
  WebSockets: MdCable
}

const ProjectTechnologyList = ({ technologies = [] }) => {
  if (technologies.length === 0) return null
  const tooltipId = `project-technologies-${technologies.join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <>
      <ul className='project-technologies list-style-none p-0 d-flex'>
        {technologies.map(technology => {
          const Icon = technologyIcons[technology]

          return Icon && (
            <li key={technology}>
              <Icon
                className='project-technology-icon'
                role='img'
                aria-label={technology}
                data-tooltip-id={tooltipId}
                data-tooltip-content={technology}
              />
            </li>
          )
        })}
      </ul>
      <Tooltip id={tooltipId} />
    </>
  )
}

export default ProjectTechnologyList
