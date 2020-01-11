import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Footer from "../../components/Footer"
import './index.scss'

interface PageState {
  songsList: Array<{
    id: number;
    album: {
      id: number;
      name: string;
      picUrl: string;
    };
    artists: [{
      name: string;
    }];
  }>;
}
export default class Daily extends Component<{}, PageState>{
  constructor(props) {
    super(props)
    this.state = {
      songsList: []
    }
  }
  componentDidMount() {
    this.getDailySongs()
  }
  // 获取每日推荐歌曲
  getDailySongs = () => {
    Taro.request({
      url: 'http://localhost:3000/recommend/songs',
      header: {
        'content-type': 'application/json',
        'Cookie': "MUSIC_U =" + Taro.getStorageSync('cookie')
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          songsList: res.data.data.dailySongs
        })
      })
  }
  // 播放歌曲
  play(id: number) {
    Taro.navigateTo({
      url: '/pages/play/index?id=' + id
    })

  }
  config: Config = {
    navigationBarTitleText: '每日推荐'
  }

  render() {
    return (
      <View className='dailySongs'>
        <View className='cover' style="background-image: url('http://p1.music.126.net/-eq6sZ43t_Kqu6v4Avt-cA==/109951164233269298.jpg')">
          {/* <View className="btn-back"></View> */}
          <View className='time'>
            <Text className='month'>09</Text>
            <Text className='day'> / 01</Text>
          </View>
          <View className='des'>根据你的音乐口味，为你推荐好音乐、好朋友</View>
        </View>
        <View className='songList'>
          <View className='btns'>
            <View className='play'>
              <View className='icon-paly-all'></View>
              <Text>播放全部</Text>
            </View>
            <View className='select'>
              <View className='icon-select-more'></View>
              <Text>多选</Text>
            </View>
          </View>
          <View className='list'>
            {this.state.songsList.map(item => {
              return <View className='item' key={item.album.id}>
                <View className='item-left'>
                  <View className='pic'>
                    <Image src={item.album.picUrl} className='pic-image' />
                  </View>
                  <View className='info'>
                    <View className='name'>{item.album.name}</View>
                    <View className='singer'>{item.artists[0].name} - {item.album.name}</View>
                  </View>
                </View>
                <View className='item-right'>
                  <View className='btn-play' onClick={() => { this.play(item.id) }}></View>
                  <View className='btn-more'></View>
                </View>
              </View>
            })}
          </View>
        </View>
        <View className='footer'>
          <Footer />
        </View>
      </View>
    )
  }
}