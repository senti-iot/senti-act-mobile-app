import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
// Chart libraries
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AreaChart, YAxis, XAxis, Path } from 'react-native-svg-charts'
import { ClipPath, Defs, LinearGradient as LiGr, Rect, Stop, Line as L, Circle } from 'react-native-svg'
import * as shape from 'd3-shape'

// Datepicker data
var currentWeek = moment().format('W');
var currentMonth = moment().format('MMMM');
var currentYear = parseInt(moment().format('YYYY'));
var firstWeekDay = moment().day("Monday").year(currentYear).week(currentWeek).format('Do MMMM YYYY');
var lastWeekDay = moment().day("Sunday").year(currentYear).week(currentWeek).add(7, "days").format('Do MMMM YYYY');


const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

// Charts data
const data = [0, 50, 10, 40, 95, 40, 130, 85, 0];
const data1 = [0, 5, 45, 28, 80, 99, 12, 44, 0];
const indexToClipFrom = 10
const dataYear = [" ", 'Jan', 'Mar', 'May', 'June', 'Sep', 'Oct', 'Dec', " "];
const dataDays = [" ", "Mon", "Tue", "We", "Thu", "Fri", "Sat", "Sun", " "];



// Charts components
const Gradient = () => (
  <Defs key={'defs'}>
    <LiGr id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={'#5ebdb5'} stopOpacity={2} />
      <Stop offset={'100%'} stopColor={'#a0d9d4'} stopOpacity={0.8} />
    </LiGr>
  </Defs>
)

const Clips = ({ x, width }) => (
  <Defs key={'clips'}>
    <ClipPath id={'clip-path-1'} key={'0'}>
      <Rect x={0} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
    </ClipPath>
    <ClipPath id="clip-path-2" key={'1'}>
      <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'} />
    </ClipPath>
  </Defs>
)

const Line = ({ line }) => (
  <Path
    key={'line'}
    d={line}
    stroke={'#174A5A'}
    strokeWidth={3}
    fill={'none'}
    clipPath={'url(#clip-path-1)'}
  />
)

const HorizontalLine = (({ y }) => (
  <L
    key={'zero-axis'}
    x1={'0%'}
    x2={'100%'}
    y1={y(50)}
    y2={y(50)}
    stroke={'orange'}
    strokeDasharray={[7, 5]}
    strokeWidth={3}
  />
))


class SpendingsScreen extends React.Component {
  componentDidMount() { }
  constructor(props) {
    super(props);
    this.state = {
      date: firstWeekDay + ' - ' + lastWeekDay,
      selectedButton: 'button1',
      waterSavings: 40,
      wastewaterSavings: 75,
      totalSavings: 115,
      current: '15 L',
      previous: '20 L',
      regionReduction: 25,
      currentConsumption: 45,
      data: dataDays,
      lastDayMonth: '28',
      dataMonth: [" ", "1", "5", "10", "15", "20", "25", "0", " "],
    };
  }

  clickHandler = (g) => {
    this.setState({ date: g });
  };

  // Changes color of the button when pressed
  onButtonPress = (g, m) => {
    if (m === 'button1') {
      this.setState({ data: dataDays })
    }
    if (m === 'button2') {
      var lastDayOfCurrentMonth = moment().month(currentMonth).daysInMonth().toString()
      let dataMonth = [...this.state.dataMonth];
      dataMonth[7] = lastDayOfCurrentMonth
      this.setState({ data: dataMonth })
    }
    if (m === 'button3') {
      this.setState({ data: dataYear })
    }
    this.setState({ selectedButton: m, date: g })
  }

  // Increment function for the datepicker
  increment = () => {
    if (!isNaN(this.state.date)) {
      // format: 2020
      this.setState({ date: this.state.date + 1 })
    }
    else if (this.state.date.length < 10) {
      // format: April
      var mAdd = moment().month(this.state.date).add(1, 'month').format("MMMM") // month increment +1
      var lastDayMonth = moment().month(mAdd).daysInMonth().toString() // number of days in a month
      let dataMonth = [...this.state.dataMonth];
      dataMonth[7] = lastDayMonth // adding last day of the month at the end of the xAxis

      this.setState({ date: mAdd, lastDayMonth: lastDayMonth, data: dataMonth })
    }
    else if (this.state.date.length > 10) {
      // format: 1st April 2020 - 7th April 2020
      var first = moment(this.state.date, 'Do MMMM YYYY ').add('days', 7).format("Do MMMM YYYY  ");
      var last = moment(this.state.date, '- Do MMMM YYYY').add('days', 7).format("- Do MMMM YYYY ");
      this.setState({ date: first + last })
    }

  }
  // Decrement function for the datepicker
  decrement = () => {
    if (!isNaN(this.state.date)) {
      // format: 2020
      this.setState({ date: this.state.date - 1 })
    }
    else if (this.state.date.length < 10) {
      // format: April
      var mSub = moment().month(this.state.date).subtract(1, 'month').format("MMMM")
      var lastDayMonth = moment().month(mSub).daysInMonth().toString() // number of days in a month
      let dataMonth = [...this.state.dataMonth];
      dataMonth[7] = lastDayMonth // adding last day of the month at the end of the xAxis

      this.setState({ date: mSub, data: dataMonth })
    }
    else if (this.state.date.length > 10) {
      // format: 1st April 2020 - 7th April 2020
      var firstDate = moment(this.state.date, 'Do MMMM YYYY ').subtract('days', 7).format("Do MMMM YYYY ");
      var lastDate = moment(this.state.date, '- Do MMMM YYYY').subtract('days', 7).format("- Do MMMM YYYY");
      this.setState({ date: firstDate + lastDate })
    }
  }



  render() {
    const { route, navigation } = this.props;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>


          {/* HEADER */}
          <View style={styles.header}>
            <LinearGradient colors={['#aacce5', '#c5e9f4']}
              style={{
                width: '100%',
                borderRadius: 10,
                flexDirection: 'row',
                padding: 3
              }}>
              <View style={{ width: '100%', position: "absolute" }}>
                <Image source={require('../../Assets/start/girlphone.png')} style={{ width: '44%', height: 110, alignSelf: 'flex-end', marginTop: 10 }}></Image>
              </View>
              <View>
                <Text style={styles.headerText}>
                  Here you get an overview of your consumption
              </Text>
              </View>
            </LinearGradient>
          </View>
          {/* HEADER */}

          <View style={styles.container}>
            <View style={styles.content}>


              {/* DATE PICKER */}
              <View style={styles.datepickerContainer}>
                <TouchableOpacity onPress={() => this.decrement()}>
                  <Image
                    source={require('../../Assets/consumption/back.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
                <Text style={{ color: "#174A5A" }}>{this.state.date}</Text>
                <TouchableOpacity onPress={() => this.increment()}>
                  <Image
                    source={require('../../Assets/consumption/next.png')}
                    style={{ width: 20, height: 20, tintColor: '#174A5A' }}
                  />
                </TouchableOpacity>
              </View>
              {/* DATE PICKER BUTTONS - refactoring needed */}
              <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center' }}>
                <View style={{ padding: 10, width: '38%', paddingHorizontal: 2 }}>
                  <TouchableOpacity style={{
                    backgroundColor: this.state.selectedButton === "button1" ? 'orange' : 'white',
                    borderColor: this.state.selectedButton === "button1" ? 'orange' : '#174A5A',
                    marginRight: 5,
                    borderRadius: 50,
                    borderWidth: 2,
                    width: '100%',
                    justifyContent: 'center',
                    padding: 4
                  }}
                    onPress={() => this.onButtonPress(firstWeekDay + ' - ' + lastWeekDay, 'button1')}>
                    <Text style={{
                      textAlign: 'center',
                      color: this.state.selectedButton === "button1" ? 'white' : '#174A5A'
                    }}>
                      Week</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 10, width: '38%', paddingHorizontal: 2 }}>
                  <TouchableOpacity style={{
                    backgroundColor: this.state.selectedButton === "button2" ? 'orange' : 'white',
                    borderColor: this.state.selectedButton === "button2" ? 'orange' : '#174A5A',
                    marginRight: 5,
                    borderRadius: 50,
                    borderWidth: 2,
                    width: '100%',
                    justifyContent: 'center',
                    padding: 4
                  }}
                    onPress={() => this.onButtonPress(currentMonth, 'button2')}>
                    <Text style={{
                      textAlign: 'center',
                      color: this.state.selectedButton === "button2" ? 'white' : '#174A5A'
                    }}>Month</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 10, width: '38%', paddingHorizontal: 2 }}>
                  <TouchableOpacity style={{
                    backgroundColor: this.state.selectedButton === "button3" ? 'orange' : 'white',
                    borderColor: this.state.selectedButton === "button3" ? 'orange' : '#174A5A',
                    marginRight: 5,
                    borderRadius: 50,
                    borderWidth: 2,
                    width: '100%',
                    justifyContent: 'center',
                    padding: 4
                  }}
                    onPress={() => this.onButtonPress(currentYear, 'button3')}>
                    <Text style={{
                      textAlign: 'center',
                      color: this.state.selectedButton === "button3" ? 'white' : '#174A5A'
                    }}>Year</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* DATE PICKER BUTTONS - refactoring needed */}
              {/* DATE PICKER */}


              <View style={{ flexDirection: 'row', width: '92%', alignSelf: 'center', marginTop: 10 }}>
                <View style={{ width: '50%', alignSelf: 'center' }}>
                  <Text style={styles.boldText}>Daily Consumption</Text>
                  <Text style={styles.consumptionText}>470 L</Text>
                </View>
                <View style={{ alignSelf: 'center', width: '50%' }}>
                  <Text style={styles.boldText}>Reduced Consumption</Text>
                  <Text style={styles.consumptionText}>10%</Text>
                </View>
              </View>

              {/* Multiline chart */}
              <View style={{ flexDirection: 'row', height: 200, width: '90%' }}>
                <View style={{ width: '15%' }}>
                  <YAxis
                    style={{ top: 0, bottom: 0, height: 200, marginTop: 10 }}
                    data={data1}
                    contentInset={{ top: 45, bottom: 0 }}
                    numberOfTicks={5}
                    spacingInner={100}
                    yAccessor={({ item }) => item}
                    svg={{
                      fontSize: 13,
                      fill: '#174A5A',
                      strokeWidth: 0.3,
                      alignmentBaseline: 'baseline',
                      baselineShift: '6',
                    }}
                  />
                </View>
                <View style={{ width: '85%', alignSelf: 'flex-end' }}>
                  <AreaChart
                    style={{ flex: 1 }}
                    data={data}
                    contentInset={{ top: 50, bottom: 0 }}
                    svg={{
                      fill: 'url(#gradient)',
                      clipPath: 'url(#clip-path-1)',
                    }}
                    numberOfTicks={5}
                    curve={shape.curveNatural}
                    extras={[HorizontalLine, Gradient, Clips]}
                  />
                  <AreaChart
                    style={StyleSheet.absoluteFill}
                    data={data1}
                    contentInset={{ top: 50, bottom: 0 }}
                    curve={shape.curveNatural}
                    showGrid={false}
                    numberOfTicks={5}
                    extras={[Line]}
                    renderDecorator={({ x, y, index, value }) => (
                      <Circle
                        key={index}
                        cx={x(index = 2)}
                        cy={y(value = this.state.currentConsumption)}
                        r={3}
                        stroke={'#174A5A'}
                        strokeWidth={6}
                        fill={'#174A5A'}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10, height: 10, marginLeft: 35 }}>
                <XAxis
                  data={this.state.data}
                  xAccessor={({ index }) => index}
                  formatLabel={index => this.state.data[index]}
                  svg={{
                    fontSize: 12, fill: '#174A5A'
                  }}
                />
              </View>
              {/* Multiline chart */}


              {/* Legend for multiline chart */}
              <View style={{ flexDirection: 'row', width: '75%', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', width: '33%' }}>
                  <Image source={require('../../Assets/consumption/currentperiodlegend.png')}></Image>
                  <Text style={styles.smallText}>Current</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '33%' }}>
                  <Image style={{ alignSelf: 'center' }} source={require('../../Assets/consumption/recommendedlegend.png')}></Image>
                  <Text style={styles.smallText}>Previous</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '33%' }}>
                  <Image source={require('../../Assets/consumption/previousperiodlegend.png')}></Image>
                  <Text style={styles.smallText}>Recommended</Text>
                </View>
              </View>
              {/* Legend for multiline chart */}
            </View>
          </View>


          <View style={styles.consumptionContainer}>

            {/* Progress circle (left card) - REFACTORING? */}
            <TouchableOpacity
              style={styles.consumptionCard}
              onPress={() => navigation.navigate('ConsumptionScreen')}>
              <View style={{}}>
                <View style={{ marginVertical: 10 }}>
                  <AnimatedCircularProgress
                    size={130}
                    width={10}
                    fill={75}
                    tintColor="#174A5A"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="white"
                    style={{
                      alignSelf: 'center'
                    }}>
                    {
                      () => (
                        <View>
                          <Text style={{ fontSize: 20, color: '#174A5A' }}>
                            {this.state.current}
                          </Text>
                          <Text style={{ fontSize: 13, color: '#95ACB4' }}>
                            ({this.state.previous})
                        </Text>
                        </View>
                      )
                    }
                  </AnimatedCircularProgress>
                  <AnimatedCircularProgress
                    size={95}
                    width={10}
                    fill={89}
                    tintColor="#AFDFDB"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="white"
                    style={{
                      alignSelf: 'center',
                      position: 'absolute',
                      marginTop: 17,
                    }}>
                  </AnimatedCircularProgress>
                </View>
                <Text style={styles.boldText}>
                  My consumption status?
                </Text>
                <Text style={{ fontSize: 13, paddingHorizontal: 10, color: '#174A5A' }}>
                  To this date, you should us less water than the last week
                </Text>
              </View>
            </TouchableOpacity>
            {/* Progress circle (left card) */}


            {/* Map (right card)     */}
            <View style={styles.consumptionCard}>
              <Image source={require('../../Assets/consumption/map.png')} style={{ width: 135, height: 135, alignSelf: 'center' }} />
              <Text style={{ fontSize: 13, paddingHorizontal: 10, marginTop: 13, color: '#174A5A' }}>
                In total, all players in the Northern Jutland region have reduced water consumption by:
              </Text>
              <Text
                style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 19, marginTop: 5, color: '#174A5A' }}>
                {this.state.regionReduction} %
              </Text>
            </View>
            {/* Map (right card)     */}
          </View>


          {/* Savings bottom card [pig]*/}
          <View style={styles.bottomConsumptionCard}>
            <View style={{ width: '25%' }}>
              <Image source={require('../../Assets/consumption/pig.png')} style={{ width: 71, height: 67 }} />
            </View>
            <View style={{ width: '75%' }}>
              <Text style={{ fontWeight: 'bold', color: '#174A5A', marginBottom: 5, fontSize: 15 }}>
                You've saved in the last week
              </Text>
              <Text style={{ fontSize: 14, color: '#174A5A' }}>
                <B>{this.state.waterSavings} DKK</B> on water and <B>
                  {this.state.wastewaterSavings} DKK</B> on wastewater. This gives
                a total saving of <B>{this.state.totalSavings} DKK</B>.
              </Text>
            </View>
          </View>
          {/* Savings bottom card [pig]*/}
        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({

  // Main components
  container: {
    flex: 1,
    backgroundColor: '#EEF3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  // Header
  header: {
    padding: 10,
    width: '98%',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerText: {
    borderRadius: 10,
    width: '55%',
    padding: 25,
    fontSize: 16,
    color: '#174A5A'
  },

  // Datepicker
  datepickerContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  arrow: {
    width: 20,
    height: 20,
    tintColor: '#174A5A',
  },
  // button: {
  //   backgroundColor: 'rgba(0,0,0,0)',
  //   marginRight: 5,
  //   borderRadius: 50,
  //   borderWidth: 2,
  //   width: '100%',
  //   justifyContent: 'center',
  // },

  // Text
  boldText: {
    color: '#174A5A',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    color: '#174A5A',
    fontSize: 11,
    alignSelf: 'center',
    marginLeft: 5,
  },
  consumptionText: {
    color: '#174A5A',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
  },

  // Section under multiline chart
  consumptionContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  consumptionCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 5,
    minHeight: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bottomConsumptionCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '92%',
    marginBottom: 10,
    shadowOpacity: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SpendingsScreen;
