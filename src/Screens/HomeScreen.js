import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import jebani from '../Assets/competition.png';
import * as Progress from 'react-native-progress';
import AchievementService from '../Networking/AchievementService';
import LinearGradient from 'react-native-linear-gradient';
import UserService from '../Networking/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import image1 from '../Assets/icons/1.png'
import image2 from '../Assets/icons/2.png'
import image3 from '../Assets/icons/3.png'
import image4 from '../Assets/icons/4.png'
import image5 from '../Assets/icons/5.png'
import image6 from '../Assets/icons/6.png'
import image7 from '../Assets/icons/7.png'

var images = [image1,image2,image3,image4,image5,image6,image7]

const BagdeBox = props => {
  return (
    <View style={styles.bagdeBoxContainer}>
      <View style={{ flex: 1, marginLeft: 10 }}>
      <LinearGradient style={{borderRadius: 999999,alignItems: 'center',justifyContent: 'center', width:50, height:50}}
          colors={['#C0E9EE', '#80D0D8', '#46BAC6']}>
        <Image source={images[props.bagdeId - 1]} style={{ flex:1, resizeMode:'center'}}/>
        </LinearGradient>
      </View>
      <View style={{ flex: 5, flexDirection: 'column'}}>
        <Text style={styles.bagdeBoxTitle}>{props.title}</Text>
        <Text style={styles.bagdeBoxDescription}>{props.description}</Text>
      </View>
    </View>
  );
};

const RulesBox = props => {
  return (
    <View style={styles.bagdeBoxContainer}>
      <View style={{marginLeft: 15 }}>
        <LinearGradient
          colors={['#C0E9EE', '#80D0D8', '#46BAC6']}
          style={{borderRadius: 999999,alignItems: 'center',justifyContent: 'center',width:50, height:50}}>
          <Image
            style={{aspectRatio:3/5, resizeMode:'contain', flex:1}}
            source={props.source}
          />
        </LinearGradient>
      </View>
      <View style={{ flex: 6, flexDirection: 'column', margin: 10 }}>
        <Text style={styles.bagdeBoxTitle}>{props.title}</Text>
        <Text style={styles.bagdeBoxDescription}>{props.description}</Text>
      </View>
    </View>
  );
};

const BagdeBoxProgress = props => {
  return (
    <View style={styles.bagdeBoxContainer}>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View
          style={{
            backgroundColor: 'black',
            width: 50,
            height: 50,
            borderRadius: 999999,
          }}
        />
      </View>
      <View style={{ flex: 6, flexDirection: 'column', paddingTop: 10 }}>
        <Text style={styles.bagdeBoxProgressTitle}>{props.title}</Text>
        <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
          <Progress.Bar
            progress={props.progress}
            width={240}
            height={8}
            color={'#FA821B'}
            style={{ height: 10, alignSelf: 'center' }}
          />
          <Text
            style={{
              fontSize: 13,
              paddingLeft: 4,
              color: '#174A5A',
              fontWeight: '500',
            }}>
            {props.progress * 100}%
          </Text>
        </View>
        <Text style={styles.bagdeBoxDescription}>{props.description}</Text>
      </View>
    </View>
  );
};

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      status: 'badges',
      text: 'Reduce your water consumption and earn badges',
      achievements: [],
      users: [],
      sortedUsers: [],
      userId:'',
      avatarSource:null
    };
  }

  async componentDidMount() {
    this.getAllUsers();
    await this.getId();
    this.getAchievements();
    this.getAvatar();
  }

  getAvatar= async()=>{
    var avatar =  await AsyncStorage.getItem('avatar');
    this.setState({avatarSource: avatar});   
  }

  getAllUsers = () => {
    UserService.getAllUsers()
      .then(x => {
        this.setState({ users: x })
      })
      .catch(err => {
        console.log(err)
      })
  };

  getId = async ()=>{
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user)
    var uuid = user.uuid
    UserService.getByUuid(uuid).then(async x =>{
      this.setState({
        userId:x[0].id
      })
      await AsyncStorage.setItem('id', x[0].id);
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }

  getAchievements = async () => {
    var id = await AsyncStorage.getItem('id')
    AchievementService.getForUser(id)
      .then(x => {
        this.setState({ achievements: x,refreshing: false });
      })
      .catch(err => {
        console.log(err)
        this.setState({refreshing: false});
      });
  };

  decide = () => {
    switch (this.state.status) {
      case 'badges': {
        //PUT BREAK HERE LATER !!!! --> karcsi !!
        return (
          <View style={{flex:1,backgroundColor: 'white',borderRadius: 10, marginTop:10}}>
            <View style={[styles.userBoxContainer,{alignSelf:'flex-start'}]}>
              <View style={{ flex: 2, marginLeft: 10 }}>
                <View style={{backgroundColor: '#F6F6F6',width: 90,height: 90,borderRadius: 999999}}>
                {this.state.avatarSource?<Image source={{uri:this.state.avatarSource}} style={{flex:1, borderRadius: 500,}} />:null}
                </View>
              </View>
              <Text style={styles.userBoxPoints}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>1500</Text>
                points
              </Text>
              <Text style={styles.userBoxDescr}>
                Here you can see all your badges that you have won as you
                contribute to reducing your water usage. Unlock more badges on
                an ongoing basis.
              </Text>
            </View>
            {this.state.achievements.length > 0 ? (
              this.state.achievements.map(x => {
                return <BagdeBox title={x.name} description={x.description} bagdeId={x.badge_id}/>;
              })
            ) : (
              <View style={{width:'100%', height:30, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.userBoxDescr}>You don't have any achievements yet :/</Text>
                </View>
              )}
            {/* <BagdeBox title='Expert' description='You have been an active player for 3 months and you have therefore earned the title as an expert.'></BagdeBox>
              <BagdeBoxProgress title='Water Expert' description='You have been reduced you water consumption by 10%.' progress={0.8}></BagdeBoxProgress>
              <BagdeBox title='Water Chuj' description='You have been reduced you water consumption by 10%.'></BagdeBox>
              <BagdeBoxProgress title='Karol Badge' description='siema kurwa' progress={0.2}></BagdeBoxProgress> */}
          </View>
        );
      }

      case 'leaderboard': {
        const currentDate = new Date().getDate();
        const lastDayOfCurrentMonth = moment().endOf('month').format('DD');
        const calculateMonthProgress = currentDate / lastDayOfCurrentMonth;

        const list = this.state.users.sort((a, b) => { return b.xp - a.xp; });
        const userLoggedIn = 5;   // ID of user that is currently logged in

        const colors = ['#C0E9EE', '#80D0D8', '#46BAC6'];
        const colorsDefault = ['white', 'white', 'white',];

        const firstPlace = require('../Assets/firstplace.png');
        const secondPlace = require('../Assets/secondplace.png');
        const thirdPlace = require('../Assets/thirdplace.png');
        const drop = require('../Assets/drop.png');

        // var myIndex = list.filter(x=>x.id === this.state.userId)
        var indexOfUser = list.findIndex(x => x.id ===this.state.userId);
        // alert(list2)
        return (
          <View style={{paddingVertical:20}}>
              <Text style={{ color: '#2F5D6C', fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}> The following days are left of the competition</Text>
              <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                <Progress.Bar progress={calculateMonthProgress} width={240} height={10} color={'#184858'} style={styles.progressBarLb} />
                <Text style={styles.textLb}>{lastDayOfCurrentMonth - currentDate} days left</Text>
              </View>
              <View >
                <Text style={{ color: '#2F5D6C', fontWeight: 'bold', marginBottom: 3, marginTop: 15,  }}>The best players</Text>
                <ScrollView>
                  {list.slice(0,3).map((item,index) => {
                     return  <LinearGradient colors={index === userLoggedIn ? colors : colorsDefault} >
                     <View style={styles.containerLb}>
                       <View style={{flexDirection: 'row', width: "70%", justifyContent: 'space-between', alignItems: 'center'}}>
                           <Image style={{ paddingLeft:5 }} source={
                             index === 0 ? firstPlace : firstPlace &&
                               index === 1 ? secondPlace : secondPlace &&
                                 index === 2 ? thirdPlace : thirdPlace}></Image>
                           <Text style={styles.textLb2}>{item.nickname}</Text>
                       </View>
                       <View style={{width: '30%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                         <Text style={styles.textLb3}>{item.xp}</Text>
                         <View style={{ width: "30%" }}>
                           <Image style={styles.dropProp} source={drop} />
                         </View>
                       </View>
                     </View >
                   </LinearGradient>
                   })}
                    
                  </ScrollView>
              </View>

              <View>
                <Text style={{ color: '#2F5D6C', fontWeight: 'bold', marginBottom: 3, marginTop: 15 }}>Other players</Text>
               
                  <ScrollView>
                  {list.slice(indexOfUser-1,indexOfUser+2).map((item,index) => {
                     return <LinearGradient colors={item.id === this.state.userId ? colors : colorsDefault}>
                     <View style={styles.containerLb}>
                     <View style={{flexDirection: 'row', width: "70%", justifyContent: 'space-between', alignItems: 'center'}}>
                         <Text style={{width: '20%', textAlign:'center', color: '#2F5D6C', fontWeight:'bold'}}>{list.findIndex(x => x.id ===item.id)}</Text>
                         <Text style={styles.textLb2}>{item.nickname}</Text>
                       </View>
                       <View style={{width: '30%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                         <Text style={styles.textLb3}>{item.xp}</Text>
                         <View style={{ width: "30%" }}>
                           <Image style={styles.dropProp} source={drop} />
                         </View>
                       </View>
                     </View >
                   </LinearGradient>
                   })}
                    
                  </ScrollView>
              </View>
            </View>
        )
      }
      case 'rules': {
        return (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              flexDirection: 'column',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={styles.rulesView}>
              <RulesBox
                title="Competitions"
                description="Competitions will last one month, at the end of which all the points will be reset and a new competition will start."
                source={require('../Assets/icons/rule_1.png')}
              />
            </View>
            <View style={styles.rulesView}>
              <RulesBox
                title="Point calculation"
                description="The points awarded are based on % of improvement compared to last month's average, and bonus points according to your relative consumption."
                source={require('../Assets/icons/rule_2.png')}
              />
            </View>
            <View style={styles.rulesView}>
              <RulesBox
                title="Levels"
                description="You will gain levels the more you play the game, mainly through acquiring badges, but also logging in daily and sharing the game."
                source={require('../Assets/icons/rule_3.png')}
              />
            </View>
            <View style={styles.rulesView}>
              <RulesBox
                title="Badges"
                description="Badges are the main way of leveling up, and you will get them for all sorts of achievements, you can check some of them in the badges tab."
                source={require('../Assets/icons/rule_4.png')}
              />
            </View>
          </View>
        );
      }
    }
  };

  changeView = status => {
    switch (status) {
      case 'badges':
        this.setState({ text: 'Reduce your water consumption and earn badges' });
        break;
      case 'leaderboard':
        this.setState({
          text:
            'Points and location in relation to yourself and your fellow players',
        });
        break;
      case 'rules':
        this.setState({
          text:
            'Get help and insight into the rules of the game The Senti.act game',
        });
        break;
      default:
        break;
    }
    // this.props.navigation.setParams({ title: status })
    this.setState({ status });
  };

  render() {
    return (
      <ScrollView style={{ paddingHorizontal: 20,flex:1 }} contentContainerStyle={{justifyContent:'center'}}
      refreshControl={
        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getAchievements()} tintColor={'#174A5A'} colors={['#174A5A']} />}>
        <View style={{ flex: 1, marginTop: 50 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              height: 135,
              backgroundColor: '#33AFA3',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <View
              style={{
                flex: 1,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ paddingLeft: 20, fontSize: 18, color: '#174a5a' }}>
                {this.state.text}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{ width: width / 2.6, height: width / 2.5 }}
                source={jebani}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            height: 50,
            flexDirection: 'row',
            borderRadius: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.changeView('badges');
            }}
            style={styles.tab}>
            <Text style={styles.boldText}>Bagdes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.changeView('leaderboard');
            }}
            style={styles.tab}>
            <Text style={styles.boldText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.changeView('rules');
            }}
            style={styles.tab}>
            <Text style={styles.boldText}>Game Rules</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', flex: 1 }}>
          {this.decide(this.state.status)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  bagdeBoxContainer: {
    // height: 120,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:20
  },
  bagdeBoxTitle: {
    // flex: 1,
    alignSelf: 'flex-start',
    color: '#174A5A',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  bagdeBoxProgressTitle: {
    // flex: 1,
    // alignSelf: 'flex-start',
    color: '#174A5A',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  bagdeBoxDescription: {
    // flex: 4,
    paddingLeft: 10,
    paddingTop: 10,
    // alignSelf: 'flex-start',
    color: '#174A5A',
    fontSize: 14,
  },
  userBoxContainer: {
    // height: 150,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flex: 1,
    paddingVertical:10,
  },
  userBoxPoints: {
    flex: 1,
    paddingLeft: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#174A5A',
    fontSize: 12,
  },
  userBoxDescr: {
    flex: 5,
    paddingLeft: 20,
    alignSelf: 'center',
    color: '#174A5A',
    fontSize: 14,
  },
  boldText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#174A5A',
  },
  tab: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rulesView: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  progressBarLb: {
    height: 10,
    alignSelf: 'center',
    marginBottom: 10,
    width: '70%',
  },
  textLb: {
    color: '#2F5D6C',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    width: '30%',
    paddingHorizontal: 10,
  },
  textLb2: {
    width: '70%',
    fontWeight: 'bold',
    color: '#2F5D6C',
  },
  textLb3: {
    width: '70%',
    fontWeight: 'bold',
    color: '#2F5D6C',
    fontSize: 17,
    textAlign: 'right',
  },
  containerLb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#A2B7BD',
    borderRadius: 10,
    justifyContent: 'center',
  },
  dropProp: {
    width: 18,
    height: 26,
    alignSelf: "flex-end",
    paddingRight:5
  },

});

export default HomeScreen;
