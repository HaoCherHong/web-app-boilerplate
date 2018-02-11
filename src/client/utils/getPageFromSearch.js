import querystring from 'querystring';

export default function getPageFromSearch(search) {
  return parseInt(querystring.parse(search.slice(1)).p) || 1;
}