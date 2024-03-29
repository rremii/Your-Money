import React, { FC, Suspense } from "react"
import PreloaderIcon from "@icons/android-chrome-512x512.avif"


export const withSuspense = (Component: FC) => () => {


  return (
    <Suspense
      fallback={
        <div id="preloader">
          <img
            className="preloader-icon"
            src={PreloaderIcon}
            alt="preloader"
          />
        </div>
      }
    >
      <Component />
    </Suspense>
  )
}
