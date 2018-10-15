import { RequestClient } from 'app/utils';

const requestClient = () => new RequestClient('https://api.github.com/users/');

const doGetRepos = (payload) => {
  const { username } = payload;
  const uri = '{username}/repos?type=all&sort=updated'.replace('{username}', username);
  return requestClient()
    .setUri(uri)
    .doGet();
};

export {
  doGetRepos,
};
