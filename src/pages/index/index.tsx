import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import './index.scss'

interface PageState {
  bannerList: Array<{
    pic: string;
    bannerId: string;
  }>;
  songLists: Array<{
    name: string;
    id: number;
    coverImgUrl: string;
  }>;
  current: number;
}
export default class Index extends Component<{}, PageState> {

  constructor(props) {
    super(props)
    this.state = {
      bannerList: [],
      songLists: [],
      current: 0
    }
  }
  componentWillMount() {
    this.getBanner()
    this.getHotSongs()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // 获取轮播
  getBanner = () => {
    Taro.request({
      url: 'http://localhost:3000/banner?type=2',
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          bannerList: res.data.banners
        })
      })
  }
  // 获取热门歌单
  getHotSongs = () => {
    Taro.request({
      url: 'http://localhost:3000/top/playlist?limit=9',
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          songLists: res.data.playlists
        })
      })
  }
  handleClick = () => { }
  config: Config = {
    navigationBarTitleText: '首页'
  }
  render() {
    return (
      <View className='index'>
        <View className='top'>
          {/* 轮播 */}
          <View className='banner'>
            <Swiper
              className='banner_list'
              indicatorColor='#999'
              indicatorActiveColor='#d43c33'
              circular
              indicatorDots
              autoplay
            >
              {
                this.state.bannerList.map(item =>
                  <SwiperItem key={item.bannerId} className='banner_list__item'>
                    <Image src={item.pic} className='banner_img' />
                  </SwiperItem>
                )
              }
            </Swiper>
          </View>
          {/* 标签 */}
          <View className='tags'>
            <View className='item'>
              <View className='icon'>
                <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
              </View>
              <Text>每日推荐</Text>
            </View>
            <View className='item'>
              <View className='icon'>
                <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
              </View>
              <Text>歌单</Text>
            </View>
            <View className='item'>
              <View className='icon'>
                <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
              </View>
              <Text>排行榜</Text>
            </View>
            <View className='item'>
              <View className='icon'>
                <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
              </View>
              <Text>电台</Text>
            </View>
            <View className='item'>
              <View className='icon'>
                <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
              </View>
              <Text>直播</Text>
            </View>
          </View>
        </View>
        {/* 分割线 */}
        <View className='line'></View>
        {/* 推荐歌单 */}
        <View className='songs'>
          <View className='title'>
            <View className='big-title'>推荐歌单</View>
            <View className='sub-title'>歌单广场</View>
          </View>
          <View className='card-list'>
            {
              this.state.songLists.map(v => {
                return <View className='card' key={v.id}>
                  <Image src={v.coverImgUrl} className='cover' />
                  <Text className='name'>{v.name}</Text>
                </View>
              })
            }
          </View>
        </View>
        {/* footer */}
        <View className='footer'>
          <AtTabBar
            fixed
            backgroundColor='#efeeee'
            selectedColor='#e0a5a4'
            tabList={[
              { title: '发现', image: require('../../assets/images/temp/find.png'), dot: true },
              { title: '视频', image: require('../../assets/images/temp/tv.png') },
              { title: '我的', image: require('../../assets/images/temp/my.png'), dot: true },
              { title: '朋友', image: require('../../assets/images/temp/friend.png') },
              { title: '账号', image: require('../../assets/images/temp/account.png') }
            ]}
            onClick={this.handleClick}
            current={this.state.current}
          />
        </View>
      </View>
    )
  }
}
