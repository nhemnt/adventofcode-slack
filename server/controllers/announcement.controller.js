import axios from 'axios';
import { BadRequestError, InternalError, MissingFieldError } from '../errors';

export const announcement = async (req, res) => {
  const { WEBHOOK_URI } = process.env;

  if (WEBHOOK_URI === null) {
    throw new MissingFieldError('Missing webhook URI');
  }
  const blocks = req?.body?.blocks || [];

  try {
    if (Array.isArray(blocks) && blocks.length) {
      await axios.post(WEBHOOK_URI, {
        username: `Advent of Code`,
        icon_emoji: ':christmas_tree:',
        blocks: blocks,
      });
      return res.status(200).send({ response: 'ok' });
    }
    throw new BadRequestError();
  } catch (_err) {
    // err contains sensitive info
    throw new InternalError(_err);
  }
};
