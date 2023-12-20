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
    rootDir: 'src',
    include: ['./', 'layer', 'source', 'geom'],
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
          id: 'source',
          title: '源',
          locales: {
            'en-us': {
              title: 'Source'
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
      ]
    }
  ]
};
