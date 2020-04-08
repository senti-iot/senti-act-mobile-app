import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Switches from 'react-native-switches';
import {TextInput} from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import TipsService from '../../Networking/TipsService';

class SubmitTipScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anonymous: false,
      category: '',
      title: '',
      description: '',
      user_id: '1574ec1a-7443-11ea-9eaf-08606e6ce1c1'
    };
  }

  submitTip() {
    TipsService.SubmitTip(this.state.category + 1, this.state.title, this.state.description, this.state.user_id,this.state.anonymous) 
      .then(() => {
        alert('succesfully submitted the tip');
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  submission = (anonymous, category, description, title) => {
    alert(
        'Anonymous: ' +
        anonymous +
        ', Category: ' +
        category +
        ', Advice: ' +
        description +
        'Title: ' + title,
    );
  };

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{height: '100%', width: '100%'}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View style={{flex: 1, marginTop: 10}}>
            <View
              style={{
                backgroundColor: '#BBD7E9',
                alignSelf: 'center',
                borderRadius: 15,
                height: 120,
                width: '90%',
              }}>
              <Text style={styles.boldTitle}>
                Contribute to the change with your knowledge
              </Text>
              <Text style={styles.text}>
                Do you have any advice on how to save more water? Fill out this
                form to share your tip with your community
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              flexDirection: 'column',
              marginTop: 15,
              marginBottom: 15,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <Text style={styles.boldTitle}> Fill out the form</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}> Anonymous lookup</Text>
              <Switches
                colorSwitchOff={'#8390A2'}
                colorSwitchOn={'#FF8000'}
                shape={'pill'}
                showText={false}
                buttonSize={29}
                sliderWidth={60}
                buttonOffsetRight={4}
                onChange={() =>
                  this.setState({anonymous: !this.state.anonymous})
                }
                value={this.state.anonymous}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.text}> Category </Text>
              <View
                style={{
                  height: 35,
                  width: 180,
                  borderWidth: 1,
                  borderColor: '#BBD7E9',
                  borderRadius: 12,
                  backgroundColor: 'white',
                }}>
                <ModalDropdown
                  options={[
                    'Laundry tips',
                    'Bathing tips',
                    'Toilet tips',
                    'Washing dishes tips',
                    'Faucet tips',
                    'Water waste tips',
                  ]}
                  onSelect={category => this.setState({category})}
                  value={this.state.category}
                  textStyle={{
                    alignSelf: 'center',
                    fontSize: 14,
                    paddingTop: 7,
                    color: '#6D6993',
                  }}
                  dropdownTextStyle={{fontSize: 15, color: '#174A5A'}}
                  dropdownTextHighlightStyle={{
                    fontSize: 16,
                    color: '#174A5A',
                  }}></ModalDropdown>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                margin: 10,
              }}>
                <Text style={styles.boldText}> Title of your advice</Text>
              <View
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderColor: '#BBD7E9',
                  borderRadius: 17,
                  backgroundColor: '#f8f8ff',
                }}>
                <TextInput
                  onChangeText={title => this.setState({title})}
                  value={this.state.title}
                  numberOfLines={2}
                  multiline={true}
                  maxLength={150}
                  style={styles.text}
                />
              </View>
              <Text style={styles.boldText}> Enter your advice!</Text>
              <View
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderColor: '#BBD7E9',
                  borderRadius: 17,
                  backgroundColor: '#f8f8ff',
                }}>
                <TextInput
                  onChangeText={description => this.setState({description})}
                  value={this.state.description}
                  numberOfLines={5}
                  multiline={true}
                  maxLength={600}
                  style={styles.text}
                />
              </View>
              <Text style={styles.text}>
                * Please note that your submission must be read and approved
                before it becomes visible in the app. You will receive a
                notification when this occurs.
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  // this.submission(
                  //   this.state.anonymous,
                  //   this.state.category,
                  //   this.state.description,
                  //   this.state.title,
                  // )
                  this.submitTip()
                }
                style={{
                  alignSelf: 'center',
                  width: 125,
                  height: 40,
                  backgroundColor: '#FF8000',
                  borderRadius: 20,
                  justifyContent:'center',

                }}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 20,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  box: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingRight: 20,
  },
  text: {
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#174A5A',
  },
  boldText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#174A5A',
  },
  boldTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#174A5A',
    paddingTop: 15,
    paddingBottom: 10,
    alignSelf: 'center',
  },
};

export default SubmitTipScreen;
