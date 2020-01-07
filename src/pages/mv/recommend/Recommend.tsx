import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './recommend.scss'

interface PageState {
  mvList: Array<{
    id: number;
    cover: string;
    name: string;
    artistName: string;
  }
  >;
}
export default class Recommend extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      mvList: []
    }
  }
  componentDidMount() {
    this.getMvList()
  }
  // 获取推荐mv
  getMvList() {
    Taro.request({
      url: 'http://localhost:3000/mv/exclusive/rcmd?limit=10',
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          mvList: res.data.data
        })
      })
  }
  render() {
    return (
      <View className='recommend'>
        {
          this.state.mvList.map(item => {
            return <View className='item' key={item.id}>
              <View className='cover' style={{ backgroundImage: `url(${item.cover})` }}>
                <View className='btn-play'>
                  <Image src={require('../../../assets/images/ajf.png')} className='play' />
                </View>
              </View>
              <View className='title'>{item.name}</View>
            </View>
          })
        }
      </View >
    )
  }
}