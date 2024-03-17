import React, { FC, Suspense } from "react"

export const withSuspense = (Component: FC) => () => {
  return (
    <Suspense
      fallback={
        <div id="preloader">
          <img
            className="preloader-icon"
            src="./../../src/shared/assets/LightTheme/categories.png"
            alt="preloader"
          />
        </div>
      }
    >
      <Component />
    </Suspense>
  )
}
