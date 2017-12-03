# README #

## Installation 

run the following command:

1. Install node modules required
```
npm install
```

2. Create configuration files by copying `config/config.default.json` to `config/config.dev.json` and `config/config.prod.json`
    

## Develop

run the following command:

```
npm run dev
```

The app will be listening on port `80` or the port you configured.

If you change client-side codes, app will update automatically.

If you change server-side codes, **you need to restart the server**.

## Build (for production)

```
npm run build
```

Clean / Rebuild:
```
npm run clean
npm run rebuild
```

## Run (for production)

```
npm start
```