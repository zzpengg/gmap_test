<View style={styles.loginform}>
  <Loading label="上傳中" visible={this.state.upload}/>
  <View>
    {
      /*this.state.avatar == null ?
      <Image source={require('../assets/fuck_cat.jpg')} style={styles.personImage} />
      :
      <Image source={{uri: `https://test-zzpengg.c9users.io:8080/images/${this.state.avatar}`}} style={styles.personImage} />*/
    }
    <View style={styles.viewFlexRow} >
       <View style={{padding:10}}>
         <View style={{marginLeft: 60}} >
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            { this.state.avatarSource === null ? <Text>選擇照片</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            </View>
            <Text style={{marginLeft: 100}}>{this.state.uploadState}</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginLeft:80}} onPress={this.upload}>
            <Text >按此上傳圖片</Text>
          </TouchableOpacity>
        </View>
    </View>
    <View style={{alignSelf: 'center'}}>
      <Text style={{fontSize: 32}}>{this.state.account}</Text>
    </View>
    <View style={{alignSelf: 'center', flexDirection: 'row'}}>
      <View style={{alignSelf: 'flex-end', flexDirection: 'row', }}>
        <Text style={{paddingTop:13, fontSize: 15, color: '#7b7d85'}}>名字</Text>
        <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>{this.state.name}</Text>
        <Icon name="ios-arrow-forward" style={{marginTop: 10}}/>
      </View>
      {/*<Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (name) => this.setState({ name: name }) } value={this.state.name}></Input>*/}
    </View>
    <View style={{ alignItems: 'center' }}>
      <View style={styles.hr} />
    </View>
    <View style={{alignSelf: 'center', flexDirection: 'row'}}>
      <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>密碼</Text>
      <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (password) => this.setState({ password: password }) } value={this.state.password}></Input>
    </View>
   </View>
   <Button style={styles.submitBtn} onPress={this.updateMyInfo} block warning> 確認修改 </Button>
   <Button style={styles.submitBtn} onPress={this.onLogout.bind(this)} block info> 登出 </Button>
 </View>
