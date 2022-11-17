import path from 'path';
import { github, editor } from './logo.mjs';
import { getSVGNode } from '../utils/getSVGNode.mjs';
import { darkMode } from '../utils/darkMode.mjs';

const ICONS_PATH = path.resolve(process.cwd(), 'scripts/assets/quickreference.svg');
export function header({ homePath, githubURL = '' }) {
  const svgNode = getSVGNode(ICONS_PATH);
  const data = [
    {
      menu: true,
      href: githubURL,
      target: '__blank',
      label: '编辑',
      children: [editor],
    },
    ...darkMode(),
    {
      menu: true,
      href: 'https://github.com/huxuezhi/reference',
      target: '__blank',
      children: [github],
    },
  ];
  return {
    type: 'element',
    tagName: 'nav',
    properties: {
      class: 'header-nav',
    },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          class: ['max-container'],
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: homePath,
              class: ['logo'],
            },
            children: [
              ...svgNode,
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: ['title'],
                },
                children: [{ type: 'text', value: 'Quick Reference' }],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'div',
            properties: {
              class: ['menu'],
            },
            children: data.map(({ href, label, menu, children = [], ...props }) => {
              if (!menu) return { children, ...props };
              const childs = {
                type: 'element',
                tagName: 'a',
                properties: { href, class: [], ...props },
                children: [
                  ...children,
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: label ? [{ type: 'text', value: label }] : [],
                  },
                ],
              };
              if (label) {
                childs.children = [
                  ...children,
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: [{ type: 'text', value: label }],
                  },
                ];
              } else {
                childs.children = children;
              }
              return childs;
            }),
          },
        ],
      },
    ],
  };
}
