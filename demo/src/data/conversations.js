const conversations = [
  {
    name: 'rallylongmailname@wix.com',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Arnold Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Sir Robert Walpole',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'A. Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Spencer Compton',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Arnold S.',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Henry Pelham',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Arnold Schwarz',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Duke of Newcastle',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Arni Zenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'John Stuart',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Nold Gger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'George Grenville',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Ard Benegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Charles Watson-Wentworth',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'A.B. Schwa',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'William Pitt',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Roni Arnold',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Augustus FitzRoy',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Old Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Frederick North',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Bold Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Charles Watson-Wentworth',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Mold Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'William Petty',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Cold Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'William Cavendish-Bentinck',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Hold Schwarzenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Henry Addington',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Bold Schwarz',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'William Grenville',
    text: 'Made a purchase in the total of 7.00$',
    timestamp: '7/14/2016',
    thumbnail:
      'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'S. Zenegger',
    text: 'Get to the chopper',
    timestamp: 'Jul 19th 214',
  },
  {
    name: 'Johnny Gibson',
    text: 'Do you also carry these shoes in black?',
    timestamp: '36 min',
    count: '5',
    // thumbnail: 'https://static.wixstatic.com/media/87994e3d0dda4479a7f4d8c803e1323e.jpg/v1/fit/w_750,h_750/87994e3d0dda4479a7f4d8c803e1323e.jpg',
    isNew: false,
  },
  {
    name: 'Jennifer Clark',
    text: 'This might be the subject\nAnd the content is on a new line',
    timestamp: '2 hours',
    count: '1',
    thumbnail:
      'https://static.wixstatic.com/media/c1ca83a468ae4c998fe4fddea60ea84d.jpg/v1/fit/w_750,h_750/c1ca83a468ae4c998fe4fddea60ea84d.jpg',
    isNew: true,
  },
  {
    name: 'Rebecka',
    text: 'Yep',
    timestamp: '3 hours',
    count: '12',
    thumbnail:
      'https://static.wixstatic.com/media/43cddb4301684a01a26eaea100162934.jpeg/v1/fit/w_750,h_750/43cddb4301684a01a26eaea100162934.jpeg',
    isNew: true,
    leftTitleBadge: 'badgeOfficial',
  },
  {
    name: 'Murphy',
    text: 'Do you have international shipping?',
    timestamp: '1 Day',
    count: '2',
    thumbnail:
      'https://static.wixstatic.com/media/84e86e9bec8d46dd8296c510629a8d97.jpg/v1/fit/w_750,h_750/84e86e9bec8d46dd8296c510629a8d97.jpg',
    isNew: false,
  },
  {
    name: 'Matttt',
    text: 'will get to you next week with that',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/b27921b8c46841b48032f11c16d6e009.jpg/v1/fit/w_750,h_750/b27921b8c46841b48032f11c16d6e009.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
  {
    name: 'Brad Taylor',
    text: 'Will I be able to receive it before July 3rd?',
    timestamp: '1 Week',
    count: '99',
    thumbnail:
      'https://static.wixstatic.com/media/7c69c135804b473c9788266540cd90d3.jpg/v1/fit/w_750,h_750/7c69c135804b473c9788266540cd90d3.jpg',
    isNew: false,
  },
  {
    name: 'Lina Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/a7adbc41a9f24a64803cac9aec2deb6b.jpg/v1/fit/w_750,h_750/a7adbc41a9f24a64803cac9aec2deb6b.jpg',
    isNew: true,
    leftTitleBadge: 'facebookOn',
  },
  {
    name: 'Marissa Mayer',
    text: 'When will you have them back in stock?',
    timestamp: '1 Week',
    count: '',
    thumbnail: '',
    isNew: true,
  },
  {
    name: 'Elliot Brown',
    text: '2 - 3 weeks',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/66003687fdce4e6197cbaf816ca8fd17.jpg/v1/fit/w_750,h_750/66003687fdce4e6197cbaf816ca8fd17.jpg',
    isNew: true,
  },
  {
    name: 'Vanessa Campbell',
    text: 'Do you have these in other colors?',
    timestamp: '1 Week',
    count: '',
    thumbnail:
      'https://static.wixstatic.com/media/d4367b20ae2e4036b18c34262d5ed031.jpg/v1/fit/w_750,h_750/d4367b20ae2e4036b18c34262d5ed031.jpg',
    isNew: true,
    leftTitleBadge: 'twitterOn',
  },
]

export default conversations
