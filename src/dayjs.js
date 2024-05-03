
import dayjs from 'dayjs'

const dayjsPlugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs
  }
}

export default dayjsPlugin