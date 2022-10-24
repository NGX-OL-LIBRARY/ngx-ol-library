module.exports = {
  mode: 'full',
  theme: 'default',
  title: 'NGX-OL-LIBRARY',
  logoUrl: 'assets/logo-light.svg',
  repoUrl: 'https://github.com/NGX-OL-LIBRARY/ngx-ol-library',
  docsDir: 'docs',
  publicDir: 'public',
  navs: [
    null,
    {
      title: '组件',
      path: 'components',
      lib: 'nol',
      locales: {
        'en-us': {
          title: 'Components'
        }
      }
    },
    {
      title: 'GitHub',
      path: 'https://github.com/NGX-OL-LIBRARY/ngx-ol-library',
      isExternal: true
    }
  ],
  libs: [
    {
      name: 'nol',
      rootDir: './src',
      include: ['layer', 'source', 'style', 'interaction', 'control'],
      docDir: 'docs',
      categories: [
        {
          id: 'general',
          title: '通用',
          locales: {
            'en-us': {
              title: 'General'
            }
          }
        },
        {
          id: 'layers',
          title: '图层',
          locales: {
            'en-us': {
              title: 'Layers'
            }
          }
        },
        {
          id: 'controls',
          title: '控件',
          locales: {
            'en-us': {
              title: 'Controls'
            }
          }
        },
        {
          id: 'interactions',
          title: '互动',
          locales: {
            'en-us': {
              title: 'Interactions'
            }
          }
        },
        {
          id: 'sources',
          title: '源',
          locales: {
            'en-us': {
              title: 'Sources'
            }
          }
        },
        {
          id: 'styles',
          title: '样式',
          locales: {
            'en-us': {
              title: 'Styles'
            }
          }
        },
        {
          id: 'others',
          title: '其他组件',
          locales: {
            'en-us': {
              title: 'Other Components'
            }
          }
        }
      ]
    }
  ],
  defaultLocale: 'zh-cn',
  locales: [
    {
      key: 'zh-cn',
      name: '中文'
    },
    {
        key: 'en-us',
        name: 'EN'
    },
  ],
};