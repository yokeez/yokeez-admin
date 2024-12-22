import Head from 'next/head'
import { PureComponent } from 'react'
import { message } from 'antd'
import Page from '@components/common/layout/page'
import { videoService } from '@services/video.service'
import Router from 'next/router'
import { BreadcrumbComponent } from '@components/common'
import { FormUploadVideo } from '@components/video/form-upload-video'
import { IVideo } from 'src/interfaces'

interface IFiles {
  fieldname: string;
  file: File;
}

class UploadVideo extends PureComponent {
  state = {
    uploading: false,
    uploadPercentage: 0
  }

  _files: {
    thumbnail: File | any;
    video: File | any;
    teaser: File | any;
  } = {
      thumbnail: null,
      video: null,
      teaser: null
    }

  onUploading(resp: any) {
    this.setState({ uploadPercentage: resp.percentage })
  }

  beforeUpload(file: File, field: string) {
    const typedKey = field as keyof typeof this._files
    this._files[typedKey] = file
  }

  async submit(data: IVideo) {
    if (!this._files.video) {
      message.error('Please select video!')
      return
    }
    if ((data.isSale && !data.price) || (data.isSale && data.price < 1)) {
      message.error('Invalid amount of tokens')
      return
    }
    const files = Object.keys(this._files).reduce((f, key) => {
      const typedKey = key as keyof typeof this._files

      if (this._files[typedKey]) {
        f.push({
          fieldname: key,
          file: this._files[typedKey] || null
        })
      }
      return f
    }, [] as IFiles[]) as [IFiles,]

    await this.setState({
      uploading: true
    })
    try {
      await videoService.uploadVideo(files as any, data, this.onUploading.bind(this))
      message.success('Video has been uploaded')
      Router.push('/video')
    } catch (error) {
      message.error('An error occurred, please try again!')
      this.setState({ uploading: false })
    }
  }

  render() {
    const { uploading, uploadPercentage } = this.state
    return (
      <>
        <Head>
          <title>Upload video</title>
        </Head>
        <BreadcrumbComponent breadcrumbs={[{ title: 'Video', href: '/video' }, { title: 'Upload new video' }]} />
        <Page>
          <FormUploadVideo
            submit={this.submit.bind(this)}
            beforeUpload={this.beforeUpload.bind(this)}
            uploading={uploading}
            uploadPercentage={uploadPercentage}
          />
        </Page>
      </>
    )
  }
}

export default UploadVideo
