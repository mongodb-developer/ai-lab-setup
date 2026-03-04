// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// Change here to customise config

// Name of the Github Repo, it's also teh baseUrl
const workshopName = 'docusaurus-workshop';
// Change this if hosting outside mongodb-developer
const organizationName = "mongodb-developer";

// Main page config
const title = "Docusaurus Meta Workshop";
const tagLine = "A Workshop written in Docusaurus to teach you how to write Workshops using docusaurus";
const startButtonTitle = "Enter Inception";
const favicon = "img/favicon.svg"

// Main Page Features
const featureList = [
  {
    title: 'Hands-On Experiences',
    illustration: 'img/coding.png',
    description: `
        Learn by doing, not by reading.
    `,
  },
  {
    title: 'Amazing Instructors',
    illustration: 'img/highfive.png',
    description: `
        Build it with the help of our amazing instructors, or just do it on your own.
    `,
  },
  {
    title: 'Take-Home Material',
    illustration: 'img/writing.png',
    description: `
        Take home the material and keep learning.
    `,
  },
];

// UTM stuff

const utmAdvocateName = `diego.freniche`;
const utmWorkshopName = 'docusaurus_workshop'

const utmParams = `utm_campaign=devrel&utm_source=workshop&utm_medium=cta&utm_content=${utmWorkshopName}&utm_term=${utmAdvocateName}`;

// Footer links (probably no need to change them)

const footerLinks = [
  {
    label: "Try MongoDB Atlas",
    href: `https://www.mongodb.com/try?${utmParams}`,
  },
  {
    label: "Forums",
    href: `https://www.mongodb.com/community/forums?${utmParams}`,
  },
  {
    label: 'Skill Badges',
    href: `https://learn.mongodb.com/skills?team=devrel&${utmParams}`,
  },
  {
    href: `https://github.com/${organizationName}/${workshopName}`,
    label: "This lab in GitHub",
  },
];

///////////////////////////////////////////////////////////////////////////////
// DON'T CHANGE ANYTHING BELOW UNLESS YOU KNOW WHAT YOU'RE DOING             //
///////////////////////////////////////////////////////////////////////////////

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${title}`,
  tagline: `${tagLine}`,
  url: `https://${workshopName}.github.io`,
  baseUrl: `/${workshopName}/`,
  projectName: `${organizationName}.github.io`,
  organizationName: `${organizationName}`,
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: `${favicon}`,
  deploymentBranch: "gh-pages",
  staticDirectories: ["static"],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  customFields: {
    startButtonTitle: `${startButtonTitle}`,
    featureList: featureList,
    utmParams,
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl: `https://github.com/${organizationName}/${workshopName}/blob/main`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-ZJ28V71VTQ",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve("docusaurus-lunr-search"),
      {
        languages: ["es", "en"], // language codes
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      announcementBar: {
        id: "feedback_form",
        content:
          'This is a demonstration that we can put a pop-up message here! Even <a target="_blank" rel="noopener noreferrer" href="#">links</a>',
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: true,
      },
      navbar: {
        title: `${title}`,
        logo: {
          alt: "MongoDB Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
          className: "navbar-logo",
          width: "135px",
          height: "100%",
        },
        items: [
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: footerLinks,
        copyright: `© ${new Date().getFullYear()} MongoDB, Inc.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["powershell", "swift", "kotlin"],
      },
      mermaid: {
        theme: { light: "neutral", dark: "forest" },
      },
    }),
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
    },
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      ssgWorkerThreads: true,
      mdxCrossCompilerCache: true,
    },
    experimental_storage: {
      type: "localStorage",
      namespace: true,
    },
    // this should be commented out as we're generating a static site and serving it through GitHub Pages
    // See: https://docusaurus.io/blog/releases/3.4#hash-router---experimental
    // > This mode is not recommended for sites deployed through a web server.
    // experimental_router: "hash",
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;
