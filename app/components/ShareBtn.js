'use client'

import React, { memo } from 'react'
import styles from './ShareBtn.module.css'

export default memo(function ShareBtn(props) {
  const {children: text, title, url} = props
  
  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url,
    }

    try {
      await navigator.share(shareData)
      console.info('shared successfully')
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }

  return (
    // globalThis.navigator?.canShare()
    <button className={`${styles.shareBtn} text-center text-center`} onClick={handleShare}>
      <i className="far fa-share-square fa-fw fa-1x me-1"></i>
      Share code
    </button>
  );
})