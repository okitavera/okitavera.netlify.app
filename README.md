# okitavera.me

> everybody loves source code, isn't it ?

[![Netlify Status](https://api.netlify.com/api/v1/badges/2693ef39-e7b6-4c20-b375-0d7ac3619925/deploy-status)](https://app.netlify.com/sites/okitavera/deploys)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![eleventy](https://img.shields.io/badge/staticgen-eleventy-%23707070.svg)](https://11ty.io)

## Local Install

Clone, and Install with your _package-manager-of-choice_

```
$ yarn install
```

## Workflow

### First run

```
$ gulp clean # cleanup destination directory
$ gulp images # generate images (download avatars, build compressed images, etc)
$ gulp serve # generate, watch, and served to http://localhost:8080
```

### Next run

```
$ gulp serve
```

### Update images and run

```
$ gulp images
$ gulp serve
```

## License

Apart from the dependencies, OFL Fonts, and Creative Common's assets like images and articles, this code is available under [MIT License](LICENSE)
