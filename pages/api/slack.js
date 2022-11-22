import { adventOfCode } from "../../server/controllers/slack.controller";
import { NextApiHandler } from "../../server/middelwares/NextApiHandler";
import { withAuth } from "../../server/middelwares/withAuth";

export default NextApiHandler({
  // on get method
  post: withAuth(adventOfCode)
})
