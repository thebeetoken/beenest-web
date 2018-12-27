# Beenest Marketing Pages

This repo is for creating static Beenest marketing pages.

## Install Gatsby

Make sure that you have the Gatsby CLI program installed:

```sh
npm install --global gatsby-cli
```

## Install Packages and dependencies

```
npm install | yarn
```

## Active development

```
npm/yarn dev
```

Once this command is run hot module reloading (HMR) will take over and update the page as you work on it.

## Builds

```
npm/yarn build
```

## Typescript Notes

The declarations.d.ts file enables assets and graphql to work as expected. Everything is looking good to go.

It's important to watch the terminal or even VSCode's Problems panel (View menu > Problems) for Typescript issues, they don't always show up in the browser with hot module reloading. One thing I noticed is that VSCode will forget about the declarations.d.ts file and start throwing errors (usually about images/assets). To clear this I just opened declarations and VSCode remembered the file.

## Extra reading

### gatsby-starter-default

The default Gatsby starter.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).
