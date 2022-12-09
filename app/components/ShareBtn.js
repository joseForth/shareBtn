'use client'

import React, { memo, useState } from 'react'
import styles from './ShareBtn.module.css'
import RenderIf from './RenderIf'

export default memo(function ShareBtn(props) {
  const {children: text, content} = props
  const [errorMessage, setErrorMessage] = useState("")
  
  const handleCopy = async () => {
    if(errorMessage) return

    setShowCopyAlert(true)
    await navigator?.clipboard?.writeText("XXXX-XXXX-XXXX")
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
      await navigator?.share(shareData)
      console.info('shared successfully')
    } catch (err) {
      console.error(err)
      setErrorMessage("Your browser is not compatible with this function")
      setTimeout(() => setErrorMessage(""), 4000)
    }

  }

  console.log(window, navigator)

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
                url={getWebsiteUrl(1)}
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
                url={getWebsiteUrl(1)}
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
                url={getWebsiteUrl(1)}
                title="Forth referral code"
                summary={`${content}`}
                description={`${content}`}
                source={getWebsiteUrl(1)}
                className={styles.socialMediaButton}
              >
                <LinkedinIcon size={25} round="true"/> 
                <p>LinkedIn</p>
              </LinkedinShareButton>
            </li>
            <li className="dropdown-item">
              <WhatsappShareButton
                url={getWebsiteUrl(1)}
                title={`${content}`}
                separator=" "
                className={styles.socialMediaButton}
              >
                <WhatsappIcon size={25} round="true"/> 
                <p>Whatsapp</p>
              </WhatsappShareButton>
            </li>
            <li className="dropdown-item">
              <EmailShareButton className={styles.socialMediaButton} subject='Forth referral code' body={content} url={getWebsiteUrl(1)} separator=" ">
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