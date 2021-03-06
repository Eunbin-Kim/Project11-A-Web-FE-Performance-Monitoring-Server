import got from 'got';

import githubConfig from '@config/github';
import { GithubToken } from '@interfaces/githubToken';
import db from '@models';
import { User } from '@interfaces/models/user';
import jwt from 'jsonwebtoken';
import passportConfig from '@config/passport';

const githubURL = `https://github.com/login/oauth/authorize?client_id=${githubConfig.client_id}`;

const githubCallback = async (code: string): Promise<User> => {
  const { body }: { body: GithubToken } = await got.post(
    'https://github.com/login/oauth/access_token',
    {
      json: {
        client_id: githubConfig.client_id,
        client_secret: githubConfig.client_secret,
        code,
      },
      responseType: 'json',
    },
  );
  const getUser = await got('https://api.github.com/user', {
    headers: {
      Authorization: `${body.token_type} ${body.access_token}`,
    },
  });
  const callbackBody: { id: string; login: string } = JSON.parse(getUser.body);
  let user = await db.User.findOne({
    email: 'Github-' + callbackBody.id,
  }).exec();
  if (!user) {
    user = new db.User({
      email: 'Github-' + callbackBody.id,
      nickname: callbackBody.login,
    });
    await user.save();
  }
  const token = jwt.sign(user.toJSON(), passportConfig.secretOrKey);
  return { ...user.toJSON(), token };
};

export default { githubURL, githubCallback };
