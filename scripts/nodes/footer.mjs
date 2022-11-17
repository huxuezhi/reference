import formatter from '@uiw/formatter';

export function footer(options = {}) {
  let footerText = '© 2022 quicksand 版权所有 ';
  if (options.isHome) {
    footerText += `更新于 ${formatter('YYYY/MM/DD HH:mm:ss', new Date())}`;
  }
  let beian = {
    type: 'element',
    tagName: 'a',
    properties: {
      href: 'http://beian.miit.gov.cn/',
      target: '_blank',
    },
    children: [{ type: 'text', value: ' 滇ICP备2020010174号-1' }],
  };
  return {
    type: 'element',
    tagName: 'footer',
    properties: {
      class: 'footer-wrap',
    },
    children: [
      {
        type: 'element',
        tagName: 'footer',
        properties: {
          class: ['max-container'],
        },
        children: [{ type: 'text', value: footerText }, beian],
      },
    ],
  };
}
