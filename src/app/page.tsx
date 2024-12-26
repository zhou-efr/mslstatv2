import Image, { StaticImageData, type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitchIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/SocialIcons'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { getLatestStream } from '@/lib/twitch/getLatestStream'
import { getCurrentStream } from '@/lib/twitch/getCurrentStream'
import { TwitchVideo } from '@/lib/twitch/types'
import StreamHistory from '@/components/StreamHistory'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}


function StreamThumbnails({ streams }: { streams: TwitchVideo[] }) {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  let images_src: string[] | StaticImageData[];
  if (streams) {
    images_src = streams.slice(0, 5).map(stream => stream.thumbnail_url);
  } else {
    images_src = [image1, image2, image3, image4, image5]
  }

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images_src.map((image, imageIndex) => (
          <a
            key={imageIndex}
            href={streams[imageIndex].url}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
              'hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              width={288}
              height={320}
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default async function Page() {

  async function getStreams() {
    'use server';
    let streamer_id = ["798312463"]
    let streamer_name = ["mathieusommetlive"]
  
    
    let streams:Array<TwitchVideo> = [];
    for (let i = 0; i < streamer_id.length; i++) {
        const temp:Array<TwitchVideo> = await getLatestStream(streamer_id[i], 31, "month");
        const current_stream = await getCurrentStream(streamer_id[i])
  
        if (current_stream) {
            temp[0].live = true;
            temp[0].thumbnail_url = current_stream.thumbnail_url;
            temp[0].url = "https://www.twitch.tv/".concat(streamer_name[i]);
        }
  
        streams = streams.concat(temp);
        streams = streams.map((stream) => {
          stream.thumbnail_url = stream.thumbnail_url.replace("%{width}", "640").replace("%{height}", "360");
          return stream;
        });
    }
    return streams;
  }

  const streams = await getStreams();

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Mathieu Sommet Live, les Stats.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Viewer de replay, c&apos;est en regardant ma pile de side-projects non fini 
          que j&apos;en suis venu à réaliser une interface coolos pour rechercher facilement 
          des replays de streams 🔍. <br/> (Ses résaux ci-dessous)
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://www.twitch.tv/mathieusommetlive"
              aria-label="Follow on Twitch"
              icon={TwitchIcon}
            />
            <SocialLink href="https://twitter.com/Mathieu_Sommet" aria-label="Follow on X" icon={XIcon} />
            <SocialLink
              href="https://www.instagram.com/mathieusommet.cc"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://www.youtube.com/@MathieuSommetLive"
              aria-label="Follow on Youtube"
              icon={YoutubeIcon}
            />
            <SocialLink
              href="https://discord.gg/3HHDBy7gqR"
              aria-label="Join Discord"
              icon={DiscordIcon}
            />
          </div>
        </div>
      </Container>
      <StreamThumbnails 
        streams={streams}
      />
      <StreamHistory />
    </>
  )
}
