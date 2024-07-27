import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

interface Props {
  opts: YouTubeProps['opts']
}

const ImportYouter: React.FC<React.PropsWithChildren<Props>> = ({ opts }) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo()
  }
  const config: YouTubeProps['opts'] = {
    ...opts,
  }
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  // return <iframe src="https://cul.jlwcfw.com/video/20230407/g0k4o9dari8yxuf6j3.html" />
  return <YouTube videoId={config.videoId} />
}

export default ImportYouter
