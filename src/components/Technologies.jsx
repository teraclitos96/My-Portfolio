import { IconContext } from 'react-icons'
import { FaAws, FaReact, FaVuejs } from 'react-icons/fa'
import { MdCable, MdWidgets } from 'react-icons/md'
import { RiVuejsFill } from 'react-icons/ri'
import {
  SiAmazondynamodb,
  SiGrafana,
  SiMicrosoft,
  SiMicrosoftexcel,
  SiMongodb,
  SiNodedotjs,
  SiTypescript
} from 'react-icons/si'
import { Tooltip } from 'react-tooltip'
import { generalTechnologies } from '../data/technologies'

const technologyIcons = {
  React: FaReact,
  TypeScript: SiTypescript,
  'Office.js': SiMicrosoft,
  'Microsoft Excel Add-ins': SiMicrosoftexcel,
  'Fluent UI': MdWidgets,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  AWS: FaAws,
  DynamoDB: SiAmazondynamodb,
  'Grafana Faro': SiGrafana,
  'Vue.js': FaVuejs,
  Vuex: RiVuejsFill,
  WebSockets: MdCable
}

const Technologies = ({ navigation, onNavigate }) => (
  <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-2 my-5 pb-3'>
    <div className='d-flex gap-3 justify-content-center flex-wrap'>
      <IconContext.Provider value={{ color: '#c8293b', className: 'icon-footer fs-1' }}>
        {generalTechnologies.map(name => {
          const Icon = technologyIcons[name]
          const target = navigation[name]

          return (
            <button
              key={name}
              type='button'
              className='technology-button no-button-styles'
              aria-label={name}
              onClick={() => onNavigate(target.destinationSheet)}
              data-tooltip-id='technology-tooltip'
              data-tooltip-content={name}
            >
              <Icon className='icon' aria-hidden='true' />
            </button>
          )
        })}
      </IconContext.Provider>
      <Tooltip id='technology-tooltip' />
    </div>
  </div>
)

export default Technologies
