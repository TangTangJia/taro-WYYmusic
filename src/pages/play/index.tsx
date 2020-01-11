import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import './index.scss'
interface PageState {
  id: number,
  songsDetail: {
    name: string,
    picUrl: string
  }
}
export default class SongsList extends Component<{}, PageState>{
  constructor() {
    super()
    this.state = {
      id: 0,
      songsDetail: {
        name: '',
        picUrl: ''
      }
    }
  }
  componentWillMount() {
    this.setState({
      id: +this.$router.params.id
    })
  }

  componentDidMount() {
    this.getSongDetail()
  }
  getSongDetail = () => {
    Taro.request({
      url: 'http://localhost:3000/song/detail?ids=' + this.state.id,
      header: {
        'content-type': 'application/json',
        'Cookie': "MUSIC_U =" + Taro.getStorageSync('cookie')
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          songsDetail: res.data.songs[0].al
        })
      })
  }
  config: Config = {
    navigationBarTitleText: '播放'
  }
  render() {
    return (
      <View className="play" >
        <Image src={this.state.songsDetail.picUrl} className="bg-img" />
        <View className="content">
          {/* <View className="title">{this.state.songsDetail.name}</View> */}
          <View className="play-hand"></View>
          <View className="graph">
            <View className="cover">
              <Image src={this.state.songsDetail.picUrl} className="cover-img" />
            </View>
          </View>
        </View>
      </View >
    )
  }

}