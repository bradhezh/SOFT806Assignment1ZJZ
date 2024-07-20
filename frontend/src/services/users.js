import axios from 'axios'

import config from '../../../config'

const signin = async user => {
  const res = await axios.post(
    `${config.USERS_ROUTE}`, user,
  )
  return res.data
}

const update = async (userinfo, user) => {
  await axios.put(
    `${config.USERS_ROUTE}`, userinfo, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  )
}

export default {
  signin,
  update,
}
