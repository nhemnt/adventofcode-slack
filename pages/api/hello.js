
import { test } from "../../server/controllers/test.controller";
import { NextApiHandler } from "../../server/middelwares/NextApiHandler";


export default NextApiHandler({
  // on get method
  post: test
})
