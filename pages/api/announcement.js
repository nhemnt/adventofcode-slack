import { announcement } from '@/server/controllers/announcement.controller'
import { NextApiHandler } from '@/server/middelwares/NextApiHandler'
import { withAuth } from '@/server/middelwares/withAuth'

export default NextApiHandler({
  // on post method
  post: withAuth(announcement),
})
