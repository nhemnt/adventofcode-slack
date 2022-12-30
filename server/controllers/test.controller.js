import axios from 'axios';
import { MissingFieldError, InternalError } from '../errors';

export const test = async (req, res) => {
  const { QA_URL, QA_SECRET } = process.env;

  if (QA_URL === null) {
    throw new MissingFieldError('Missing webhook URI');
  }
  if (QA_SECRET === null) {
    throw new MissingFieldError('Missing webhook URI');
  }

  try {
    // https://app.slack.com/block-kit-builder/T026NT2D4
    await axios.post(QA_URL, {}, { headers: { Authorization: QA_SECRET }});
    return res.status(200).send({ response: 'ok' });
  } catch (_err) {
    // err contains sensitive info
    throw new InternalError();
  }
};
