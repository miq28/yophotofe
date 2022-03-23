// https://stackoverflow.com/a/36222827
import * as loglevel from 'loglevel'

if (process.env.NODE_ENV !== 'production') {
  loglevel.setLevel('debug')
} else {
  loglevel.setLevel('error')
}

export default loglevel