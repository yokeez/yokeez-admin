import React from 'react'
import { Spin } from 'antd'
import './loader.less'

function Loader() {
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  )
}

export default Loader
