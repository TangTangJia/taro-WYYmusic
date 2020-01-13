import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Audio } from '@tarojs/components'
import { AtSlider } from 'taro-ui'
import './index.scss'

interface PageState {
  id: number;
  audioCtx: any;
  playBg: string;
  playing: string;
  isCanPlay: boolean;
  songsDetail: {
    name: string;
    picUrl: string;
  };
}
export default class SongsList extends Component<{}, PageState>{
  constructor() {
    super()
    this.state = {
      id: 0,
      audioCtx: undefined,
      isCanPlay: true,
      playing: '',
      playBg: require('../../assets/images/song/ajf.png'),
      songsDetail: {
        name: '',
        picUrl: ''
      }
    }
  }
  componentWillMount() {
    const audioCtx = Taro.createAudioContext('audio')
    this.setState({
      id: +this.$router.params.id,
      audioCtx: audioCtx
    })
  }

  componentDidMount() {
    this.getSongDetail()
  }
  // 获取音乐详情
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
  // 播放
  audioPlay = () => {
    if (this.state.isCanPlay) {
      this.setState({
        isCanPlay: false
      })
      this.setState({
        playBg: require('../../assets/images/song/ajd.png'),
        playing: 'playing'
      })
      this.state.audioCtx.play()
    } else {
      this.setState({
        isCanPlay: true,
        playing: ''
      })
      this.audioPause()
    }
  }
  // 暂停
  audioPause = () => {
    this.setState({
      playBg: require('../../assets/images/song/ajf.png')
    })
    this.state.audioCtx.pause()
  }
  // 重播
  audioStart = () => {
    this.state.audioCtx.seek(0)
  }
  config: Config = {
    navigationBarTitleText: '播放'
  }
  render() {
    return (
      <View className='play' >
        <Image src={this.state.songsDetail.picUrl} className='bg-img' />
        <View className='content'>
          {/* <View className="title">{this.state.songsDetail.name}</View> */}
          <View className='graph'>
            <View className={`cover ${this.state.isCanPlay ? '' : 'circle'}`}>
              <Image src={this.state.songsDetail.picUrl} className='cover-img' />
            </View>
          </View>
          <View className={`play-hand ${this.state.playing}}`}></View>
          <View className='slider'>
            <AtSlider activeColor='#fff' backgroundColor='#dddddd'></AtSlider>
          </View>
          <View className='audio'>
            <Audio
              src={'https://music.163.com/song/media/outer/url?id=' + this.state.id}
              id='audio'
            />
          </View>
          <View className='operat'>
            <View className='btn-replay' onClick={this.audioStart}></View>
            <View className='btn-pre'></View>
            <View className='btn-play' style={{ backgroundImage: `url(${this.state.playBg})` }} onClick={this.audioPlay}></View>
            <View className='btn-next'></View>
            <View className='btn-more'></View>
          </View>
        </View>
      </View >
    )
  }

}