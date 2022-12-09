'use client'

import React, { memo } from 'react'
import styles from './ShareBtn.module.css'
import forthLogo from './forthGradientIcon.png'
import RenderIf from './RenderIf'

export default memo(function ShareBtn(props) {
  const {children: text, content} = props

  const handleCopy = () => {
    if(errorMessage) return

    setShowCopyAlert(true)
    navigator.clipboard.writeText("XXXX-XXXX-XXXX")
    setTimeout(() => setShowCopyAlert(false), 3000)
  }

  const getWebsiteUrl = (websiteId = 1) => {
    const websiteList = {
      1: "https://www.forthwithlife.co.uk",
      2: "https://www.forthedge.co.uk"
    }

    return websiteList[websiteId]
  }
  
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
      console.error(err)
      setErrorMessage("Your browser is not compatible with this function")
      setTimeout(() => setErrorMessage(""), 4000)
    }

  }

  return (
    <>
      <RenderIf isTrue={navigator?.share == undefined}>
        <div className="dropdown">
          <button className={`${styles.shareBtn} text-center dropdown-toggle`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="far fa-share-square fa-fw fa-1x me-1"></i>
            Share code
          </button>

          <ul className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item">
              <FacebookShareButton
                url={getWebsiteUrl(global.config.websiteId)}
                quote={"EXAMPLE TEXT"}
                data-text={"EXAMPLE TEXT"}
                hashtag={"#forth"}
                className={`${styles.socialMediaButton}`}
              >
                <FacebookIcon size={25} round="true"/> 
                <p>Facebook</p>
              </FacebookShareButton>
            </li>
            <li className="dropdown-item">
              <TwitterShareButton
                url={getWebsiteUrl(global.config.websiteId)}
                title={`${content}`}
                hashtag="#forth"
                className={styles.socialMediaButton}
              >
                <TwitterIcon size={25} round="true"/> 
                <p>Twitter</p>
              </TwitterShareButton>
            </li>
            <li className="dropdown-item">
              <LinkedinShareButton
                url={getWebsiteUrl(global.config.websiteId)}
                title="Forth referral code"
                summary={`${content}`}
                description={`${content}`}
                source={getWebsiteUrl(global.config.websiteId)}
                className={styles.socialMediaButton}
              >
                <LinkedinIcon size={25} round="true"/> 
                <p>LinkedIn</p>
              </LinkedinShareButton>
            </li>
            <li className="dropdown-item">
              <WhatsappShareButton
                url={getWebsiteUrl(global.config.websiteId)}
                title={`${content}`}
                separator=" "
                className={styles.socialMediaButton}
              >
                <WhatsappIcon size={25} round="true"/> 
                <p>Whatsapp</p>
              </WhatsappShareButton>
            </li>
            <li className="dropdown-item">
              <EmailShareButton className={styles.socialMediaButton} subject='Forth referral code' body={content} url={getWebsiteUrl(global.config.websiteId)} separator=" ">
                <EmailIcon size={25} round="true"/> 
                <p>Email</p>
              </EmailShareButton>
            </li>
            <li className={`${styles.socialMediaButton} dropdown-item`} role="button" onClick={handleCopy}>
              <i className={`${styles.copyIcon} far fa-copy`}/> <p>Copy</p>
            </li>
          </ul>
        </div>
      </RenderIf>

      <RenderIf isTrue={navigator?.share != undefined}>
        <button className={`${styles.shareBtn} text-center text-center`} onClick={handleShare}>
          <i className="far fa-share-square fa-fw fa-1x me-1"></i>
          Share code
        </button>
      </RenderIf>

      <RenderIf isTrue={errorMessage != ""}>
        <div className={`${styles.alert} ${styles.danger} pt-3`}>
          {errorMessage}
        </div>
      </RenderIf>
    </>
  );
})