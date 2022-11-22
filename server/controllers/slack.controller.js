import axios from 'axios';
import cookie from 'cookie';
import lodash from 'lodash';
import { MissingFieldError, InternalError } from '../errors';

const formatMessage = (members, url, org, boardCode) => {
  const lines = members.map(
    ({ name, local_score, stars }) =>
      `*${name}* - ${local_score} :points: Points, ${stars} :star: Stars`
  );

  const paragraphs = [
    `Advent of Code Leaderboard :christmas_tree: ${org ? '| ' + org : ''} `,
    `<${url}|Join the board> - _*${boardCode}*_`,
    lines.join('\n'),
    `<${url}|View online leaderboard>`,
  ];

  return paragraphs.join('\n\n');
};

export const adventOfCode = async (req, res) => {
  const {
    LEADERBOARD_ID,
    SESSION_ID,
    WEBHOOK_URI,
    YEAR,
    ORGANISATION,
    BOARD_CODE,
  } = process.env;
  if (LEADERBOARD_ID === null) {
    throw new MissingFieldError('Missing leaderboard ID');
  }

  if (SESSION_ID === null) {
    throw new MissingFieldError('Missing session ID');
  }

  if (WEBHOOK_URI === null) {
    throw new MissingFieldError('Missing webhook URI');
  }

  if (BOARD_CODE === null) {
    throw new MissingFieldError('Missing Private Board Code');
  }

  const year = YEAR || new Date().getFullYear();

  const url = `https://adventofcode.com/${year}/leaderboard/private/view/${LEADERBOARD_ID}`;

  try {
    const response = await axios.get(`${url}.json`, {
      headers: { cookie: cookie.serialize('session', SESSION_ID) },
    });

    const members = lodash.sortBy(response.data.members, [
      '-local_score',
      '-stars',
    ]);
    const message = formatMessage(members, url, ORGANISATION, BOARD_CODE);

    await axios.post(WEBHOOK_URI, {
      username: `Advent of Code Leaderboard ${
        ORGANISATION ? '| ' + ORGANISATION : ''
      } `,
      icon_emoji: ':christmas_tree:',
      text: message,
    });
    return res.status(200).send({ response: { message } });
  } catch (_err) {
    // err contains sensitive info
    throw new InternalError();
  }
};
