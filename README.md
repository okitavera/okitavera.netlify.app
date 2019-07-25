# okitavera.me
> The source tree for my personal website

[![Netlify Status](https://api.netlify.com/api/v1/badges/2693ef39-e7b6-4c20-b375-0d7ac3619925/deploy-status)](https://app.netlify.com/sites/okitavera/deploys)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![eleventy](https://img.shields.io/badge/staticgen-eleventy-%23707070.svg)](https://11ty.io)


## Install

Just like any other node packages :
```sh
yarn # or npm i
```

## Usage

### Build the source into .build/ folder

```sh
yarn build
```

### Run local web server for testing

```sh
yarn serve
```

### Fetching twitter feeds
1. create `.env` file and add your twitter token and information to it, you can look at the [`.env-sample`](.env-sample) for the references.
2. run build script again (`yarn build`) to fetch and generate the source

## License

Apart from the dependencies, OFL Fonts, and Creative Common's assets like images and articles, this code is available under [MIT License](LICENSE)
