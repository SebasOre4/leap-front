/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleCheck, faCircleInfo, faCircleXmark, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'

import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faUser, faCalendar, faLinkedin, faCircleInfo, faCircleXmark, faTriangleExclamation, faCircleCheck)

export default FontAwesomeIcon
