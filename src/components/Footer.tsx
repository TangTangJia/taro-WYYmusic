import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

interface PageState {
  current: number;
}

export default class Footer extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }
  handleClick = (page) => {
    switch (page) {
      case 0:
        Taro.navigateTo({
          url: '/pages/index/index'
        })
        break;
      case 1:
        Taro.navigateTo({
          url: '/pages/mv/index'
        })
      default:
        break;
    }
  }
  render() {
    return (
      <AtTabBar
        fixed
        backgroundColor='#efeeee'
        selectedColor='#e0a5a4'
        tabList={[
          { title: '发现', image: require('../assets/images/temp/find.png'), dot: true },
          { title: '视频', image: require('../assets/images/temp/tv.png') },
          { title: '我的', image: require('../assets/images/temp/my.png'), dot: true },
          { title: '朋友', image: require('../assets/images/temp/friend.png') },
          { title: '账号', image: require('../assets/images/temp/account.png') }
        ]} onClick={this.handleClick} current={this.state.current}
      />

    )
  }
}