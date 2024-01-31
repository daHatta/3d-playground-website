# Playground for a vanilla JS project with 3D and animations

## A Single Page using Threejs, Swiper and CSS

<p align="center">
    <img src="screenshot.jpg?raw=true" alt="Screenshot of the app">
</p>

Using 3D and animations are a great anhancement for websites. In my learning process I
came up with this playground site in order to improve my skills for 3D effects and
animations in the webdevelopment.

Inspired by **Wael Yasmina** ([Youtube](https://www.youtube.com/watch?v=xJAfLdUgdc4))
I experimented with Three.js and implemented a 3D Model from [Sketchfab](https://sketchfab.com/).

The main source for my 3D CSS and animations effects was **Kevin Powell** who gave great
insides and inspiration by his videos [3D CSS - lighting, animations, and more!](https://www.youtube.com/watch?v=NdftnCDwKaU)
and [3D Tilting Card Effect with Mouse Tracking // HTML, CSS & JS](https://www.youtube.com/watch?v=Z-3tPXf9a7M)
on his [youtube-channel](https://www.youtube.com/@KevinPowell).

Using Vite as a build tool in this project, I tried to manage my assets based on the folder structure I like and found a
nice solution by **Khalid Abuhakmeh** in his blog-post [Manage Vite Assets Like A Pro](https://khalidabuhakmeh.com/manage-vite-assets-like-a-pro).

## Technical Features

- Using the Intersection Observer API for animation processes
- Using 3D library Three.js
- Using Swiper, a modern and open-source mobile touch slider
- Using modern CSS commands
- Assets Management in vite

## Site Features

- 3D-model implemented with Three.js
- Slider using Swiper.js with images loaded from Json-file
- Slide-Ins of content with CSS
- Rotation of content with CSS

## Packages

```
{
  "name": "threedee-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build --mode production",
    "preview": "vite preview",
    "serve": "vite build && vite preview --host",
    "compile:sass": "sass --watch ./src/css/style.scss ./src/css/style.css"
  },
  "devDependencies": {
    "sass": "^1.69.7",
    "vite": "^4.3.2"
  },
  "dependencies": {
    "dat.gui": "^0.7.9",
    "dotenv": "^16.3.1",
    "swiper": "^11.0.5",
    "three": "^0.152.2"
  }
}
```

## Sources

- _Three.js Tutorial For Absolute Beginners_ by Wael Yasmina [Youtube](https://www.youtube.com/watch?v=xJAfLdUgdc4)
- _Import glTF/GLB Models with Three.js_ by Coffee Code Create [Youtube](https://www.youtube.com/watch?v=aOQuuotM-Ww)
- _Three.js Realistic Lighting Setup Tutorial_ by Red Stapler [Youtube](https://www.youtube.com/watch?v=7GGNzryHfTw)
- 3D Model _Cars 2 The Video Game - FIllmore_ by [maximilian](https://sketchfab.com/maximilian_2)
- _3D Tilting Card Effect with Mouse Tracking // HTML, CSS & JS_ by Kevin Powell [Youtube](https://www.youtube.com/watch?v=Z-3tPXf9a7M)
- Intersection Observer API [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- _Manage Vite Assets Like A Pro_ by [Khalid Abuhakmeh](https://khalidabuhakmeh.com/manage-vite-assets-like-a-pro)
