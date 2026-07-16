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

const technologies = [
  { name: 'React', Icon: FaReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Office.js', Icon: SiMicrosoft },
  { name: 'Microsoft Excel Add-ins', Icon: SiMicrosoftexcel },
  { name: 'Fluent UI', Icon: MdWidgets },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'AWS', Icon: FaAws },
  { name: 'DynamoDB', Icon: SiAmazondynamodb },
  { name: 'Grafana Faro', Icon: SiGrafana },
  { name: 'Vue.js', Icon: FaVuejs },
  { name: 'Vuex', Icon: RiVuejsFill },
  { name: 'WebSockets', Icon: MdCable }
]

const Technologies = () => (
  <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-2 my-5 pb-3'>
    <div className='d-flex gap-3 justify-content-center flex-wrap'>
      <IconContext.Provider value={{ color: '#c8293b', className: 'icon-footer fs-1' }}>
        {technologies.map(({ name, Icon }) => (
          <Icon
            key={name}
            className='icon'
            role='img'
            aria-label={name}
            data-tooltip-id='technology-tooltip'
            data-tooltip-content={name}
          />
        ))}
      </IconContext.Provider>
      <Tooltip id='technology-tooltip' />
    </div>
  </div>
)

export default Technologies
