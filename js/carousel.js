/**
 * @typedef CarouselItem
 * @type {Object}
 * @property {string} serial
 * @property {string} title
 * @property {string} desc
 * @property {string} thumbnail
 * @property {string | null} href
 */

/** @type {Array<CarouselItem>} */
let carouselList = [
  { serial: '01', title: '第二把赤霄', desc: '#决战#', thumbnail: '', href: '' },
  { serial: '02', title: '笔记', desc: '#企鹅物流的秘密#', thumbnail: '', href: '' },
  { serial: '03', title: '安洁莉娜', desc: '#信使#', thumbnail: '', href: '' },
  { serial: '04', title: '莱茵生命', desc: '#科研#', thumbnail: '', href: '' },
  { serial: '05', title: '端午', desc: '#炎国水乡#', thumbnail: '', href: '' },
  { serial: '06', title: '龙门', desc: '#邻街一角#', thumbnail: '', href: '' },
  { serial: '07', title: '谜团', desc: '#源石#', thumbnail: '', href: '' },
  { serial: '08', title: '启航', desc: '#任务外出#', thumbnail: '', href: '' },
  { serial: '09', title: '企鹅物流', desc: '#办公室#', thumbnail: '', href: '' },
  { serial: '10', title: '启示', desc: '#大厅#', thumbnail: '', href: '' },
  { serial: '11', title: '死灰复燃', desc: '#不死的黑蛇#', thumbnail: '', href: '' },
  { serial: '12', title: '苏醒', desc: '#石棺之间#', thumbnail: '', href: '' },
  { serial: '13', title: '乌萨斯学生自治团', desc: '#回忆中的教室#', thumbnail: '', href: '' },
  { serial: '14', title: '瑕光', desc: '#胜利的荣光#', thumbnail: '', href: '' },
  { serial: '15', title: '谢拉格', desc: '#喀兰贸易#', thumbnail: '', href: '' },
  { serial: '16', title: '预备组', desc: '#行动预备组A4#', thumbnail: '', href: '' },
  { serial: '17', title: '整装出发', desc: '#印象图#', thumbnail: '', href: '' },
  { serial: '18', title: '追忆', desc: '#过去的村庄#', thumbnail: '', href: '' },
];

// Assign thumbnail and href
for (let i = 0; i < carouselList.length; i++) {
  carouselList[i].thumbnail = `img/carousel_${i + 1}.png`;
  carouselList[i].href = `https://cdn.jsdelivr.net/gh/hakadao/ArknightsParallaxCarousel@main/img/carousel_${i + 1}.png`;
}

// Initialize the carousel layout
carouselList.forEach((item, index) => {
  document.querySelector('#media-list').innerHTML += `
    <div 
      class="media-list-item"
      data-index="${index}"
      data-serial="${item.serial}"
      data-title="${item.title}"
      data-desc="${item.desc}"
      data-thumbnail="${item.thumbnail}"
    >
      <div 
        class="media-list-item-img" 
        style="background-image: url(${item.thumbnail});"
        data-title="${item.title}"
      ></div>
    </div>
  `;
  document.querySelector('#media-layer-front .media-nav-wrapper').innerHTML += `
    <div
      class="media-nav-item"
      active="${index === 0}"
      data-index="${index}"
      data-serial="${item.serial}"
      data-title="${item.title}"
      data-desc="${item.desc}"
      data-thumbnail="${item.thumbnail}"
    ></div>
  `;
});

let activeIndex = 0; // Initialize active index
const layerFront = document.querySelector('#media-layer-front');
const mediaSerial = layerFront.querySelector('.media-info-serial');
const mediaTitle = layerFront.querySelector('.media-info-title');
const mediaDetail = layerFront.querySelector('.media-info-detail');
const mediaMainPic = document.querySelector('#media-layer-view .media-main-pic');
const mediaImage = mediaMainPic.querySelector('.media-img');
const mediaList = document.querySelector('#media-list');

// Initialize media info
mediaImage.href = carouselList[0].href;
mediaImage.style = `background-image: url(${carouselList[0].thumbnail}); transform-origin: left top; transform: scale(1);`;
mediaSerial.innerHTML = carouselList[0].serial;
mediaTitle.innerHTML = carouselList[0].title;
mediaDetail.innerHTML = carouselList[0].desc;

// Set item spacing and click event listeners
for (let i = 0; i < carouselList.length; i++) {
  let mediaItem = mediaList.querySelector(`.media-list-item:nth-child(${i + 1})`);
  let navItem = layerFront.querySelector(`.media-nav-item:nth-child(${i + 1})`);

  const mediaListItem = mediaList.querySelector(`.media-list-item:nth-child(1)`);
  const mediaListItemWidth = getComputedStyle(mediaListItem).width.replace('px', '');
  let mediaListItemPaddingRight = getComputedStyle(mediaListItem).paddingRight.replace('px', '');

  // Calculate width displacement
  let xWidth = (parseFloat(mediaListItemWidth) + parseFloat(mediaListItemPaddingRight) * 2).toFixed(0);

  // Show the first four images, hide others
  if (i <= 3) {
    mediaItem.style.transform = `translateX(${xWidth * i}px)`;
    mediaItem.style.opacity = '1';
  } else {
    mediaItem.style.transform = `translateX(${xWidth * 3}px)`;
    mediaItem.style.opacity = '0';
    mediaItem.style.pointerEvents = 'none';
  }

  // Add click event listeners for media items and navigation
  let array = [mediaItem, navItem];
  array.forEach(item => {
    item.addEventListener('click', () => {
      if (parseInt(item.dataset.index) > parseInt(activeIndex)) {
        carouselItemSwitching(i, 'left');
      } else if (parseInt(item.dataset.index) < parseInt(activeIndex)) {
        carouselItemSwitching(i, 'right');
      }
      activeIndex = item.dataset.index;
    });
  });
}

// Arrow button click events
const arrowBtnPrev = document.querySelector('#arrow-btn-prev');
const arrowBtnNext = document.querySelector('#arrow-btn-next');

arrowBtnPrev.addEventListener('click', () => {
  activeIndex > 0 ? activeIndex-- : (activeIndex = carouselList.length - 1);
  carouselItemSwitching(activeIndex, 'right');
});

arrowBtnNext.addEventListener('click', () => {
  activeIndex < carouselList.length - 1 ? activeIndex++ : (activeIndex = 0);
  carouselItemSwitching(activeIndex, 'left');
});

/**
 * Switch carousel item with animation
 * @param {number} index Active index
 * @param {'left' | 'right'} direction Animation direction
 */
function carouselItemSwitching(index, direction) {
  // Clear old active state
  for (let i = 0; i < carouselList.length; i++) {
    layerFront.querySelector(`.media-nav-item:nth-child(${i + 1})`).setAttribute('active', 'false');
  }
  // Activate current selected nav item
  layerFront.querySelector(`.media-nav-item:nth-child(${index + 1})`).setAttribute('active', 'true');

  // Zoom and text slide-in effects
  imageZoom(0.25, direction, carouselList[index].thumbnail, carouselList[index].href).then(() => {});
  slideInText(mediaSerial, direction, 0.2, 0.4, carouselList[index].serial).then(() => {});
  slideInText(mediaTitle, direction, 0.2, 0.5, carouselList[index].title).then(() => {});
  slideInText(mediaDetail, direction, 0.2, 0.6, carouselList[index].desc).then(() => {});

  // Update main media image
  mediaImage.href = carouselList[index].href;
  mediaImage.style = `background-image: url(${carouselList[index].thumbnail});`;
}
