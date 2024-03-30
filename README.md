# A Simple Solid Calendar/Planner

This project was created for the [March 2024 Solid Hackathon](https://solidhack.org/). The goal is to produce an easy-to-use calendar application that integrates with a solid pod and can be easily embedded in other solid apps.

## Setup

Install dependencies:

```bash
npm i
```

## Developing

We are using Vite as our primary build tool. We also have a solid server to aid development.

We recommend developing like this:

In one terminal, run vite

```bash
npm run dev
```

In a second terminal, run the solid server

```bash
npm run pod
```

This will get you set up with everything you need to test the app, and will automatically refresh after any changes.

However, you could use your own Solid Pod on any Solid Provider to send and receive calendar. Here are some of the popular ones to get started:

- [Community Solid Server](https://solidweb.me)
- [Solid Prototype](https://solidweb.org)
- [Solid Community](https://solidcommunity.net)
- [Inrupt Pod Spaces](https://start.inrupt.com/profile)

The calendar events will be saved to "calendar-events" folder in your main container, this can be configured to any folder destination of your choosing.

# Event

The SheX shape used in this Solid App for the events in the calendar are of [Event](https://schema.org/Event/) type.

The following properties are associated with this [Event](https://schema.org/Event/):

- organizer ([Person](https://schema.org/Person/))
- name ([String](https://www.w3.org/2001/XMLSchema#string))
- startTime ([dateTime](https://www.w3.org/2001/XMLSchema#dateTime))
- endTime ([dateTime](https://www.w3.org/2001/XMLSchema#dateTime))
- attendees ([Person](https://schema.org/Person/))
- location ([Place](https://schema.org/Place/))
- about ([Thing](https://schema.org/Thing/))

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

You can run prettier with

```bash
npm run format
```

Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## Static Site

This project includes a simple website generated with the [eleventy](https://11ty.dev) static site generator and the templates and pages in `/docs-src`. The site is generated to `/docs` and intended to be checked in so that GitHub pages can serve the site [from `/docs` on the master branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

To enable the site go to the GitHub settings and change the GitHub Pages &quot;Source&quot; setting to &quot;master branch /docs folder&quot;.</p>

To build the site, run:

```bash
npm run docs
```

To serve the site locally, run:

```bash
npm run docs:serve
```

To watch the site files, and re-build automatically, run:

```bash
npm run docs:watch
```

The site will usually be served at http://localhost:8000.

**Note**: The project uses Rollup to bundle and minify the source code for the docs site and not to publish to NPM. For bundling and minification, check the [Bundling and minification](#bundling-and-minification) section.

## Bundling and minification

As stated in the [static site generation](#static-site) section, the bundling and minification setup in the Rollup configuration in this project is there specifically for the docs generation.

We recommend publishing components as unoptimized JavaScript modules and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

Please check the [Publishing best practices](https://lit.dev/docs/tools/publishing/#publishing-best-practices) for information on publishing reusable Web Components, and [Build for production](https://lit.dev/docs/tools/production/) for building application projects that include LitElement components, on the Lit site.

## More information

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.
