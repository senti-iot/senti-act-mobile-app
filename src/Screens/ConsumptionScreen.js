import * as React from 'react';
import { ProgressChart } from 'react-native-chart-kit'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';


const data = {
    data: [0.7, 0.8],
}


class ConsumptionScreen extends React.Component {


    constructor(props) {
        super();
    }


    changeValue = (g) => {
        this.setState({ value: g });
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{}}>
                            <Text style={styles.headerText}>Get an overview of your consumption status</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 5 }}>
                            <View style={{ flex: .8, flexDirection: 'row', justifyContent: "space-between" }}>
                                <TouchableOpacity>
                                    <Image source={require('../Assets/back.png')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                                <Text style={{}}>December</Text>
                                <TouchableOpacity>
                                    <Image source={require('../Assets/next.png')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', width: '92%' }}>
                                <View style={{ padding: 10, width: '33%', paddingHorizontal: 2 }}>
                                    <TouchableOpacity style={styles.buttonStyle}><Text style={{ textAlign: 'center' }}>Week</Text></TouchableOpacity>
                                </View>
                                <View style={{ padding: 10, width: '33%', paddingHorizontal: 2 }}>
                                    <TouchableOpacity style={styles.buttonStyle}><Text style={{ textAlign: 'center' }}>Month</Text></TouchableOpacity>
                                </View>
                                <View style={{ padding: 10, width: '33%', paddingHorizontal: 2 }}>
                                    <TouchableOpacity style={styles.buttonStyle}><Text style={{ textAlign: 'center' }}>Year</Text></TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', width: '92%', alignItems: 'center' }}>
                                <View style={{ padding: 10, width: '50%', paddingHorizontal: 2 }}>
                                    <Text style={styles.boldText}>My Daily Consumption</Text>
                                    <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 20 }}>470 L</Text>
                                </View>
                                <View style={{ padding: 10, width: '50%', paddingHorizontal: 2 }}>
                                    <Text style={styles.boldText}>Avg. User Consumption</Text>
                                    <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 20 }}>420 L</Text>
                                </View>
                            </View>
                            <View>
                                <ProgressChart
                                    data={data}
                                    width={Dimensions.get('window').width - 100}
                                    height={220}
                                    hideLegend={true}
                                    chartConfig={{
                                        backgroundColor: 'blue',
                                        backgroundGradientFrom: 'white',
                                        backgroundGradientTo: 'white',
                                        decimalPlaces: 3,

                                        color: (opacity = 1) => `rgba(23, 74, 90, ${opacity})`,
                                        style: {
                                            borderRadius: 16,

                                        },
                                    }}
                                    style={{

                                        borderRadius: 16,
                                        fontSize: 25,
                                        marginLeft: 45,
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.boldText}>My consumption status</Text>
                            </View>
                            <View style={{ width: '78%', alignSelf: 'center' }}>
                                <Text style={{ textAlign: 'center', paddingTop: 10 }}>Here you can see how much water you've consumed compared to the average consumer</Text>
                            </View>
                            {/* <View style={{ flex: 2, flexDirection: 'row', width: '92%', justifyContent: 'center' }}>
                                <View style={{ padding: 10, width: '50%', paddingHorizontal: 2 }}>
                                    <TouchableOpacity style={styles.buttonStyle}><Text style={{ textAlign: 'center' }}>My previous period</Text></TouchableOpacity>
                                </View>
                                <View style={{ padding: 10, width: '50%', paddingHorizontal: 2 }}>
                                    <TouchableOpacity style={styles.buttonStyle}><Text style={{ textAlign: 'center' }}>Total consumption</Text></TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                    </View >
                    <View style={styles.bottomConsumptionCard}>
                        <Text>You've spent 50 L more than an average user.</Text>
                    </View>
                </View >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF3F7',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
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
        backgroundColor: '#AACCE5',
        padding: 25,
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginRight: 5,
        borderRadius: 50,
        borderWidth: 2,
        width: '100%',
        justifyContent: 'center',
    },
    smallText: {
        fontSize: 11,
        alignSelf: "center",
        fontWeight: "bold",
    },
    boldText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    consumptionCard: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 5,
        minHeight: 130,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    bottomConsumptionCard: {
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor:
            'white',
        width: "92%",
        marginBottom: 10,
        shadowOpacity: 5
    },
});




export default ConsumptionScreen;