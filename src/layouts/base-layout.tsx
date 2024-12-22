import { PureComponent } from 'react'
import PrimaryLayout from './primary-layout'
import PublicLayout from './public-layout'

interface DefaultProps {
  children: any;
  layout?: string;
}

const LayoutMap:any = {
  primary: PrimaryLayout,
  public: PublicLayout
}

export default class BaseLayout extends PureComponent<DefaultProps> {
  render() {
    const { children, layout }:any = this.props
    const Container = layout && LayoutMap[layout] ? LayoutMap[layout] : LayoutMap.primary
    return (
      <Container>{children}</Container>
    )
  }
}
