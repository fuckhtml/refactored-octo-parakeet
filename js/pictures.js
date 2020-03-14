'use strict';

var generatePictureRandomData = function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
  ];

  var likes = 15 + Math.floor(Math.random() * 185);
  var description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];

  var comments = [COMMENTS[Math.floor(Math.random() * COMMENTS.length)]];
  var commentsQuantity = Math.floor(Math.random() * 10);
  for (var i = 0; i < commentsQuantity; i++) {
    var isDoublePraseComment = Boolean(Math.floor(Math.random() * 2));
    var comment = "";

    var phraseIndexOne = Math.floor(Math.random() * COMMENTS.length);
    var phraseOne = COMMENTS[phraseIndexOne];
    var phraseTwo = "";

    if (isDoublePraseComment) {
      var phraseIndexTwo = Math.floor(Math.random() * COMMENTS.length);
      while (phraseIndexOne === phraseIndexTwo) {
        phraseIndexTwo = Math.floor(Math.random() * COMMENTS.length);
      }
      phraseTwo = COMMENTS[phraseIndexTwo];
    }

    comment = phraseOne + phraseTwo;
    comments[i] = comment;
  }

  var picture = {
    url: null,
    likes: likes,
    comments: comments,
    description: description,
  };

  return picture;
};

var assemblePictureNode = function (pictureData) {
  var picture = document.querySelector('#picture').content.cloneNode(true).querySelector('.picture');
  var img = picture.querySelector('.picture__img');
  var comments = picture.querySelector('.picture__comments');
  var likes = picture.querySelector('.picture__likes');

  img.setAttribute('src', pictureData.url);
  comments.textContent = pictureData.comments.length;
  likes.textContent = pictureData.likes;

  return picture;
};


var pictureData = [];
for (var i = 0; i < 25; i++) {
  var picture = generatePictureRandomData();
  picture.url = 'photos/' + parseInt(i + 1) + '.jpg';
  pictureData[i] = picture;
}

var sectionPictures = document.querySelector('.pictures');
for (var i = 0; i < 25; i++) {
  sectionPictures.append(assemblePictureNode(pictureData[i]));
}


var sectionBigPicture = document.querySelector('.big-picture');
sectionBigPicture.classList.remove('hidden');

var bigPictureImg = sectionBigPicture.querySelector('.big-picture__img img');
var bigPictureCaption = sectionBigPicture.querySelector('.social__caption');
var bigPictureLikes = sectionBigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = sectionBigPicture.querySelector('.comments-count');

bigPictureImg.setAttribute('src', pictureData[0].url);
bigPictureCaption.textContent = pictureData[0].description;
bigPictureLikes.textContent = pictureData[0].likes;
bigPictureCommentsCount.textContent = pictureData[0].comments.length;

var assembleBigPictureCommentsNode = function(pictureData) {
  var commentList = document.createElement('ul');
  commentList.classList.add('social__comments');

  for (var i = 0; i < pictureData.comments.length; i++) {
    var commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    var img = document.createElement('img');
    img.classList.add('social__picture');
    var avatarNumber = Math.floor(Math.random() * 6) + 1;
    var avatarUrl = 'img/avatar-' + avatarNumber + '.svg';
    img.setAttribute('src', avatarUrl);
    img.setAttribute('alt', 'Аватар комментатора фотографии');
    img.setAttribute('width', '35');
    img.setAttribute('height', '35');

    var p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = pictureData.comments[i];

    commentItem.appendChild(img);
    commentItem.appendChild(p);

    commentList.appendChild(commentItem);
  }

  return commentList;
}

var bigPictureComments = sectionBigPicture.querySelector('.social__comments');
bigPictureComments.replaceWith(assembleBigPictureCommentsNode(pictureData[0]));


var bigPictureCommentCount = sectionBigPicture.querySelector('.social__comment-count');
var bigPictureCommentLoadmore = sectionBigPicture.querySelector('.social__comments-loader');

bigPictureCommentCount.classList.add('visually-hidden');
bigPictureCommentLoadmore.classList.add('visually-hidden');
