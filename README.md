# React + Vite

## Tracking pixel

Set `VITE_TRACKING_PIXEL_URL` to enable a frontend tracking pixel. The app sends a `page_view` image request on route changes with `url`, `path`, `referrer`, and UTM query params.

Example:

```env
VITE_TRACKING_PIXEL_URL=https://your-tracker.example/pixel.gif
VITE_TRACKING_PIXEL_ID=caro-game-ui
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
