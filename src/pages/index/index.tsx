import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

interface PageState {
  bannerList: Array<{
    pic: string;
    bannerId: string;
  }>;
}
export default class Index extends Component<{}, PageState> {

  constructor(props) {
    super(props)
    this.state = {
      bannerList: []
    }
  }
  componentWillMount() {
    this.getBanner()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
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
      </View>
    )
  }
}
