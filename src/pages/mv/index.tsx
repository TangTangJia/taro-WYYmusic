import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Footer from '../../components/Footer'
import './index.scss'

interface pageState {

}
export default class MV extends Component<{}, pageState> {
  config: Config = {
    navigationBarTitleText: 'MV'
  }
  constructor(props) {
    super(props)
  }

  tabClick = (page) => {
    console.log(page)
  }
  render() {
    return (
      // <View></View>
      <View className="footer">
        <Footer />
      </View>
    )
  }
}