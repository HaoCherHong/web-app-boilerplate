const post = {
  userId: 'lucher.club',
  userName: '晧哲',
  photos: [],
  title: 'Nico',
  kind: 'dog',
  gender: 'girl',
  ligated: false,
  age: {
    year: 1,
    month: 1
  },
  location: {
    city: '台北市',
    district: '大同區'
  },
  introduction: '測試文章',
  notice: '注意事項～～',
  adopted: false,
  followers: [],
  createdAt: new Date()
};
const data = [post, post, post, post];
export default function posts(state = data, action) {
  return state;
}
