import { defineConfig } from "vite";

const assets = [
    {
        output: "css/[name].[ext]",
        regex: /\.(css)$/,
    },
    {
        output: "img/[name].[ext]",
        regex: /\.(png|jpe?g|gif|svg|webp|avif)$/,
    },
];


export default defineConfig(() => {
    return {
        clearScreen: false,
        base: "/",
        server: {
            open: "index.html",
            port: 3000,
        },
        build: {
            outDir: "dist/",
            emptyOutDir: true,
            assetsDir: "src/",
            sourcemap: true,
            minify: false,
            chunkSizeWarningLimit: 1200,
            rollupOptions: {
                output: {
                    entryFileNames: "js/[name].js",
                    chunkFileNames: "js/[name]-chunk.js",
                    assetFileNames: ((info) => {

                        if ( info && info.name) {
                            const name = info.name.toString();
                            const result = assets.find(asset => asset.regex.test(name));
                            if (result) {
                                return result.output;
                            }
                        }

                        return "[ext]/[name].[ext]";
                        
                    }),
                },
            },
        },
    };
});