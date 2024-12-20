import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "MSL stats",
    name: "Mathieu Sommet Live Stats",
    theme_color: "#E5464F",
    background_color: "#000000",
    display: "fullscreen",
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    orientation: "portrait",
    icons: [
        {
            src: "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/android//android-launchericon-48-48.png",
            type: "image/png",
            sizes: "48x48"
        },
        {
            src: "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/android/android-launchericon-96-96.png",
            type: "image/png",
            sizes: "96x96"
        },
        {
            src: "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/android/android-launchericon-192-192.png",
            type: "image/png",
            sizes: "192x192"
        }
    ],
  }
}