import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: 'esnext', // Use 'esnext' to ensure modern JavaScript features are supported
        outDir: 'dist',
        assetsDir: 'assets', // Directory for static assets
        sourcemap: false, // disable source maps for production builds
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Split vendor code into separate chunks
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },
        minify: 'terser', // Use Terser for minification
        terserOptions: {
            compress: {
                drop_console: true, // Remove console logs in production
                drop_debugger: true, // Remove debugger statements in production
            },
            format: {
                comments: false, // Remove comments in production
            },
        },
    },
    optimizeDeps: {
        include: ['vue', 'vue-router', 'axios', 'bootstrap', 'lodash'],
    },
    server: {
        historyApiFallback: true,
        hmr: {
            protocol: 'ws', // Use WebSocket for hot module replacement
        },
    },
    plugins: [vue(), svgLoader()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
    },
});
