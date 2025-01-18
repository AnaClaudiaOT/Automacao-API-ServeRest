const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Desafiobancocarrefour',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Desafiobancocarrefour',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour',
          templates:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\node_modules\\docz-core\\dist\\templates',
          docz: 'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz',
          cache:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\.cache',
          app: 'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\app',
          appPackageJson:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\package.json',
          appTsConfig:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\tsconfig.json',
          gatsbyConfig:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\app\\index.html',
          db:
            'C:\\Users\\aadv\\Downloads\\desafioBancoCarrefour\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
