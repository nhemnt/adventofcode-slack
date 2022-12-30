import axios from 'axios';
import { MissingFieldError, InternalError } from '../errors';

export const test = async (req, res) => {
  const { TEST_WEBHOOK_URI } = process.env;

  if (TEST_WEBHOOK_URI === null) {
    throw new MissingFieldError('Missing webhook URI');
  }

  try {
    // https://app.slack.com/block-kit-builder/T026NT2D4
    await axios.post(TEST_WEBHOOK_URI, {
      username: 'Slackify',
      blocks:  [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Test',
            },
          },
        ]
    });
    return res.status(200).send({ response: 'ok' });
  } catch (_err) {
    // err contains sensitive info
    throw new InternalError(_err);
  }
};
