'use client'

import React, { memo } from 'react'
import styles from './ShareBtn.module.css'
import forthLogo from './forthGradientIcon.png'

import { RWebShare } from "react-web-share";

export default memo(function ShareBtn(props) {
  const {children: text, title, url} = props

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url,
      file: [forthLogo]
    }

    try {
      await navigator.share(shareData)
      console.info('shared successfully')
    } catch (err) {
      console.error(`Error: ${err}`)
    }

  }

  return (
    <>
      <button className={`${styles.shareBtn} text-center text-center`} onClick={handleShare}>
        <i className="far fa-share-square fa-fw fa-1x me-1"></i>
        Share code
      </button>

      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Share this article on Flamingos"
        }}
        onClick={() => console.info("share successful!")}
      >
        <button className={`${styles.shareBtn} text-center text-center`}>
          <i className="far fa-share-square fa-fw fa-1x me-1"></i>
          Share option 2
        </button>
      </RWebShare>
    </>
  );
})