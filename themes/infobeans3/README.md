## InfoBeans WordPress Theme

InfoBeans WordPress theme that features a InfoBeans Theme build for CSS/SASS and JavaScript. The webpack configuration is defined in the [webpack.config.js](./webpack.config.js), and the compiled assets are included in the WordPress theme via code in the [functions.php](./functions.php).

## Development

After deploying and enabling the theme on a WordPress instance (see *Deploying the Theme* section below), install the theme dependencies by running the following command in the theme root (e.g. `/wp-content/themes/infobeans`):

```
npm install
```

## Build

Various build commands are available that execute the InfoBeans Webpack builds:

- `npm run build` - development webpack build (`webpack --mode development`).
- `npm run dist` - production webpack build, with code minification enabled (`webpack --mode production`).
- `npm run watch` - development watch command.

## Deploying the Theme

This theme can be downloaded and deployed into a WordPress instance's themes directory (i.e. `/wp-content/themes`). Once the theme is deployed, run the build commands (`npm install` and `npm run dist`) to install and build the JavaScript and CSS.
