/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
  mode: 'full',
  title: 'NGX-OL-LIBRARY',
  description: 'Components for map visualization based on Openlayers',
  siteProjectName: 'site',
  docsDir: 'docs',
  navs: [
    null,
    {
      title: 'Components',
      path: 'components',
      lib: 'ngx-ol-library',
      locales: {}
    }
  ],
  libs: [
    {
      name: 'ngx-ol-library',
      abbrName: 'nol',
      rootDir: './src',
      include: [
        './',
        'control',
        'geom',
        'interaction',
        'layer',
        'source',
        'style',
      ],
      exclude: [],
      docDir: 'docs',
      apiMode: 'automatic',
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
          id: 'layer',
          title: '图层',
          locales: {
            'en-us': {
              title: 'Layer'
            }
          }
        },
        {
          id: 'control',
          title: '控件',
          locales: {
            'en-us': {
              title: 'Control'
            }
          },
        },
        {
          id: 'interaction',
          title: '交互',
          locales: {
            'en-us': {
              title: 'Interaction'
            }
          },
        },
        {
          id: 'source',
          title: '源',
          locales: {
            'en-us': {
              title: 'Source'
            }
          }
        },
        {
          id: 'style',
          title: '风格',
          locales: {
            'en-us': {
              title: 'Style'
            }
          }
        },
        {
          id: 'geom',
          title: '几何图形',
          locales: {
            'en-us': {
              title: 'Geometry'
            }
          }
        },
        {
          id: 'others',
          title: '其它',
          locales: {
            'en-us': {
              title: 'Others'
            }
          },
        },
      ]
    }
  ]
};
