import React from 'react'
import LoadingScreen from "react-loading-screen";

const PageLoader = ({loading}) => {
  return (
        <LoadingScreen
          loading={loading}
          bgColor="rgba(0, 0, 0,0.4)"
          spinnerColor="#3525B5"
          textColor="#676767"
          logoSrc=""
          text=""
        />
  )
}

export default PageLoader