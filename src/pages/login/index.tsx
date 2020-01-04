import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Login extends Component {
  config: Config = {
    navigationBarTitleText: '登录',
    navigationBarBackgroundColor: '#C20C0C',
    navigationBarTextStyle: 'white'
  }
  render() {
    return (
      <View className='login'>
        <View className='content'>
          <Image src={require('../../assets/images/logo.png')} className='logo' />
          <View className='form'>
            <View className='phone'>
              <AtIcon value='phone' size='20' color='#ffffff'></AtIcon>
              <Input type='text' placeholder='手机号' placeholderStyle='color:#eee' className='num' />
            </View>
            <View className='pwd'>
              <AtIcon value='lock' size='20' color='#ffffff' ></AtIcon>
              <Input type='text' password placeholder='密码' placeholderStyle='color:#eee' className='password' />
            </View>
          </View>
          <View className='btn-login'>立即登录</View>
        </View>
      </View >
    )
  }
}
