const localImageSource = require('../assets/images/empty-state.jpg'); // eslint-disable-line
const posts = [
  {
    coverImage: localImageSource,
    title: 'Amazing Desert',
    status: 'Published',
    timestamp: '31 August 2016',
    description: 'Reference this table when designing your app’s interface, and make sure',
    likes: 345,
  },
  {
    title: 'New Post',
    status: 'Draft',
    timestamp: '07 March 2017',
    description: 'This is the beginning of a new post',
    likes: 0,
  },
];

export default posts;
