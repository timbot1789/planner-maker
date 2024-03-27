import {defineConfig} from 'vite';

export default () => {
  return defineConfig({
    optimizeDeps: {
      // 👈 optimizedeps
      esbuildOptions: {
        target: 'esnext',
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
    },
    build: {
      target: ['esnext'], // 👈 build.target
    },
  });
};
