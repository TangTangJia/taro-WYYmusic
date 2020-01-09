import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { AtIcon, AtMessage } from 'taro-ui'
import './index.scss'

interface PageState {
  phone: string;
  password: string;
}
export default class Login extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      password: ''
    }
  }
  config: Config = {
    navigationBarTitleText: '登录',
    navigationBarBackgroundColor: '#C20C0C',
    navigationBarTextStyle: 'white'
  }
  change(type, e) {
    console.log(type, e)
    const { value } = e.detail
    if (type === 'password') {
      this.setState({
        password: value
      })
    } else {
      this.setState({
        phone: value
      })
    }
  }

  // 登录
  login() {
    const { phone, password } = this.state
    if (!phone) {
      Taro.atMessage({
        'message': '请输入手机号',
        'type': "error",
      })
      return
    }
    if (!password) {
      Taro.atMessage({
        'message': '请输入密码',
        'type': "error",
      })
      return
    }
    Taro.request({
      url: 'http://localhost:3000/login/cellphone',
      method: 'POST',
      data: {
        phone: this.state.phone,
        password: this.state.password
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          Taro.setStorageSync('cookie', res.data.token)
          Taro.navigateTo({
            url: '/pages/index/index'
          })
        } else {
          Taro.atMessage({
            'message': res.data.message,
            'type': "error",
          })
        }
      })
  }
  render() {
    return (
      <View className='login'>
        <AtMessage />
        <View className='content'>
          <Image src={require('../../assets/images/logo.png')} className='logo' />
          <View className='form'>
            <View className='phone'>
              <AtIcon value='phone' size='20' color='#ffffff'></AtIcon>
              <Input type='text' placeholder='手机号' placeholderStyle='color:#eee' className='num' onInput={(e): void => { this.change('phone', e) }} />
            </View>
            <View className='pwd'>
              <AtIcon value='lock' size='20' color='#ffffff' ></AtIcon>
              <Input type='text' password placeholder='密码' placeholderStyle='color:#eee' className='password' onInput={(e): void => { this.change('password', e) }} />
            </View>
          </View>
          <View className='btn-login' onClick={this.login}>立即登录</View>
        </View>
      </View >
    )
  }
}
