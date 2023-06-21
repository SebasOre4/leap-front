/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faArrowRightToBracket,
  faChartLine,
  faChevronLeft,
  faChevronRight,
  faChild,
  faChildDress,
  faChildren,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faEdit,
  faEye,
  faEyeSlash,
  faFileWaveform,
  faHeartPulse,
  faHome,
  faStethoscope,
  faTrash,
  faTriangleExclamation,
  faUser,
  faUsersLine
} from '@fortawesome/free-solid-svg-icons'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'

import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(
  faUser,
  faCalendar,
  faLinkedin,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
  faCircleCheck,
  faArrowRightToBracket,
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faChild,
  faChildDress,
  faChildren,
  faStethoscope,
  faChartLine,
  faHome,
  faEdit,
  faHeartPulse,
  faFileWaveform,
  faUsersLine,
  faTrash
)

export default FontAwesomeIcon
