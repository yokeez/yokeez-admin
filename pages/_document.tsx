import Document, {
  Html, Head, Main, NextScript
} from 'next/document'
import { settingService } from '@services/setting.service'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

interface IProps {
  settings: any;
}

class CustomDocument extends Document<IProps> {
  static async getInitialProps(ctx: any) {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App: any) => (props: any) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      )
    })
    const initialProps = await Document.getInitialProps(ctx)
    const style = extractStyle(cache, true)
    const resp = await settingService.public('all', true)
    const settings = resp.data
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </>
      ),
      settings
    }
  }

  render() {
    const { settings } = this.props
    return (
      <Html>
        <Head>
          <link rel="icon" href={settings?.favicon} sizes="64x64" />
          <meta name="keywords" content={settings?.metaKeywords} />
          <meta
            name="description"
            content={settings?.metaDescription}
          />
          {/* OG tags */}
          <meta
            property="og:title"
            content={settings?.siteName}
            key="title"
          />
          <meta property="og:image" content={settings?.logoUrl} />
          <meta
            property="og:keywords"
            content={settings?.metaKeywords}
          />
          <meta
            property="og:description"
            content={settings?.metaDescription}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
