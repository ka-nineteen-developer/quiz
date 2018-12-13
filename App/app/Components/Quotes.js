import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Linking,
    Image,
    Dimensions,
    ToastAndroid,
    ImageBackground,
    Share,
    Clipboard,
    AsyncStorage,
    Alert,
    StyleSheet,
    ProgressBarAndroid,
    FlatList,
    ScrollView,
    Modal,
    BackHandler
} from 'react-native';
import {
    Container,
    Left,
    Header,
    Button,
    Title,
    DeckSwiper,
    Card,
    CardItem,
    Body,
    Icon,
    Right,
    List,
    Spinner,
} from 'native-base';
import { categoryList, appUpdate, playUrl } from '../dataService';
import { baseDetails } from '../baseDetails';
import Banner from '../bannerAd.js';
import InternetCheck from '../InternetCheck';
import PlayGame from './PlayGame';

const window = Dimensions.get('window');

// Google analytics
// import {
//     GoogleAnalyticsTracker,
//     GoogleTagManager,
//     GoogleAnalyticsSettings
// } from "react-native-google-analytics-bridge";
// let tracker1 = new GoogleAnalyticsTracker("UA-130489978-1");
// tracker1.trackScreenView("Quotes");
// GoogleAnalyticsSettings.setDispatchInterval(30);

// import {
//     AdMobInterstitial,
//     PublisherBanner,
// } from 'react-native-admob';

export default class Quotes extends Component {

    constructor(props) {
        super(props);
        // const {navigate} = this.props.navigation;
        this.state = {
            'selectedNumber':  {
                'id': '10',
                'name': '10'
            },
            'selectedCat':  {
                'id': '',
                'name': null
            },
            'selectedLevel': {
                'id': '',
                'name': null
            },
            'selectedType': {
                'id': '',
                'name': null
            },
            'modalVisible': false,
            'progressBar': false
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <InternetCheck />
                {this.state.progressBar?<ProgressBarAndroid
                    styleAttr="Horizontal"
                    style={{position: 'absolute',zIndex:1,width:'100%'}}
                    color="red"
                    indeterminate={this.state.progressBar}
                />:null}
                <ScrollView>
                    <View style={styles.bannerContainerStyle} >
                        <View style={styles.curveBanner} >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                source={require('../assets/img/bg-img.png')}>

                            </Image>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button style={{
                                zIndex: 1,
                                marginTop: 10
                            }} transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='md-menu' style={{ color: '#ffffff' }} />
                            </Button>
                            <View>
                                <Text style={{
                                    fontSize: 50,
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    paddingVertical: 10
                                }}>Quiz</Text>
                            </View>
                            <Button style={{
                                zIndex: 1,
                                marginTop: 10
                            }} transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='md-menu' style={{ color: '#ffffff' }} />
                            </Button>
                        </View>
                    </View>
                    <View style={{
                        paddingTop: 20,
                        paddingHorizontal: 15,
                    }}>
                        <TouchableOpacity onPress={() => this.showModal('selectNumber')}>
                            <Card>
                                <CardItem style={{
                                    borderLeftWidth: 4,
                                    borderLeftColor: 'red',
                                }}>
                                    <View>
                                        <Text style={{ fontSize: 25 }}>
                                            {this.state.selectedNumber.name}
                                        </Text>
                                        <Text>Number of questions</Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showModal('selectCat')}>
                            <Card>
                                <CardItem style={{
                                    borderLeftWidth: 4,
                                    borderLeftColor: 'red',
                                }}>
                                    <View>
                                        <Text style={{ fontSize: 25 }}>
                                            {this.state.selectedCat.name?this.state.selectedCat.name:'Any Category'}
                                        </Text>
                                        <Text>Select Category</Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showModal('selectDifficulty')}>
                            <Card>
                                <CardItem style={{
                                    borderLeftWidth: 4,
                                    borderLeftColor: 'red',
                                }}>
                                    <View>
                                        <Text style={{ fontSize: 25 }}>
                                        {this.state.selectedLevel.name?this.state.selectedLevel.name:'Any Difficulty'}
                                        </Text>
                                        <Text>Select Difficulty</Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showModal('selectType')}>
                            <Card>
                                <CardItem style={{
                                    borderLeftWidth: 4,
                                    borderLeftColor: 'red',
                                }}>
                                    <View>
                                        <Text style={{ fontSize: 25 }}>
                                        {this.state.selectedType.name?this.state.selectedType.name:'Any type'}
                                        </Text>
                                        <Text>Select Type</Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.play()}>
                            <Card>
                                <CardItem>
                                    <Text>Play</Text>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: false }) }}
                >
                    <View style={{ backgroundColor: '#fff', flex: 1 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: 'red',
                            borderBottomWidth: 1
                        }}>
                            <TouchableOpacity onPressOut={() => {
                                this.setState({ modalVisible: false })
                            }}
                                style={{ padding: 15 }}>
                                <Text style={{ fontSize: 18 }}>CANCEL</Text>
                            </TouchableOpacity>
                            {this.state.modalName != 'selectNumber' ? <TouchableOpacity style={{ padding: 15 }}
                                onPress={() => {
                                    console.log(this.state.modalName);
                                    if (this.state.modalName == 'selectCat') {
                                        this.setState({ 'selectedCat': {'id':''} }, function(){
                                            this.setState({ modalVisible: false });
                                        })
                                    } else if (this.state.modalName == 'selectDifficulty') {
                                        this.setState({ 'selectedLevel': {'id':''} }, function(){
                                            this.setState({ modalVisible: false });
                                        })
                                    } else if (this.state.modalName == 'selectedType') {
                                        this.setState({ 'selectedType': {'id':''} }, function(){
                                            this.setState({ modalVisible: false });
                                        })
                                    }
                                }}>
                                <Text style={{ fontSize: 18 }}>ANY</Text>
                            </TouchableOpacity> : null}
                        </View>
                        {this.state.modalData ? <FlatList
                            data={this.state.modalData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { this.handleSelectedValue(item) }}>
                                    <Text style={[
                                        { fontSize: this.state.selectedValue == item.name ? 50 : 20 },
                                        { fontWeight: this.state.selectedValue == item.name ? 'bold' : 'normal' },
                                        { paddingVertical: 10 },
                                        { color: this.state.selectedValue == item.name ? 'black' : 'gray' },
                                        { textAlign: 'center' }
                                    ]}>{item.name}</Text>
                                </TouchableOpacity>
                            }
                        /> : null}
                    </View>
                </Modal>
                {this.state.showLoader?<View style={{
                    position: 'absolute',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'red'
                }}><Spinner/></View>:null}
            </View>
        );
    }

    componentDidMount() {
        console.log(this.props.navigation.state.routeName);
        this.getCatList();
        appUpdate().then(res => {
            // this.setState({ appUpdate: res });
            // this.getQuotes();
        })

    }

    handleSelectedValue(item) {
        this.setState({ modalVisible: false });
        if (this.state.modalName == 'selectCat') {
            this.setState({ 'selectedCat': item })
        } else if (this.state.modalName == 'selectDifficulty') {
            this.setState({ 'selectedLevel': item })
        } else if (this.state.modalName == 'selectType') {
            this.setState({ 'selectedType': item })
        } else if(this.state.modalName == 'selectNumber'){
            this.setState({ 'selectedNumber': item })
        }
    }

    play() {
        let url = 'https://opentdb.com/api.php?amount='+this.state.selectedNumber.id+'&category='+this.state.selectedCat.id+'&difficulty='+this.state.selectedLevel.id+'&type='+this.state.selectedType.id+''
        console.log(url);
        this.setState({'showLoader': true});
        playUrl(url).then((res)=>{
            this.setState({'quizData': res}, function(){
                this.setState({'showLoader': false}, function(){
                    this.props.navigation.navigate('PlayGame', {'quizData':this.state.quizData})
                });
            })
        })
    }

    showModal(flag) {
        if (flag == 'selectNumber') {
            this.setState({ 'modalName': 'selectNumber' });
            this.setState({ 'modalVisible': true });
            this.setState({
                'modalData': [{
                    id: '10',
                    name: '10'
                },
                {
                    id: '20',
                    name: '20'
                },
                {
                    id: '30',
                    name: '30'
                },
                {
                    id: '40',
                    name: '40'
                },
                {
                    id: '50',
                    name: '50'
                }]
            });
        } else if (flag == 'selectCat') {
            if (this.state.catList) {
                this.setState({ 'modalName': 'selectCat' });
                this.setState({ 'modalVisible': true });
                this.setState({ 'modalData': this.state.catList ? this.state.catList.trivia_categories : null });
            } else {
                ToastAndroid.show('Failed to fetch category list', ToastAndroid.SHORT);
            }
        } else if (flag == 'selectDifficulty') {
            this.setState({ 'modalName': 'selectDifficulty' });
            this.setState({ 'modalVisible': true });
            this.setState({
                'modalData': [{
                    id: 'easy',
                    name: 'Easy'
                },
                {
                    id: 'medium',
                    name: 'Medium'
                },
                {
                    id: 'hard',
                    name: 'Hard'
                }]
            });
        } else if (flag == 'selectType') {
            this.setState({ 'modalName': 'selectType' });
            this.setState({ 'modalVisible': true });
            this.setState({
                'modalData': [{
                    id: 'multiple',
                    name: 'Multiple choice'
                },
                {
                    id: 'boolean',
                    name: 'True/False'
                }]
            });
        } else {
            ToastAndroid.show('Something went worng...', ToastAndroid.SHORT);
        }
    }

    getCatList() {
        this.setState({'progressBar': true});
        categoryList().then(res => {
            this.setState({ 'catList': res });
            this.setState({'progressBar': false});
        })
    }

    showInterstitialAd() {
        // if (this.state.appUpdate.admob.interstitial.showAd) {
        //     // Display an interstitial
        //     AdMobInterstitial.setAdUnitID(this.state.appUpdate.admob.interstitial.interstitial_id);
        //     AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        //     AdMobInterstitial.requestAd().then(() => {
        //         AdMobInterstitial.showAd();
        //     });
        // }
    }
}

const styles = StyleSheet.create({
    bannerContainerStyle: {
        alignSelf: 'center',
        width: window.width,
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    curveBanner: {
        borderRadius: window.width * 4,
        overflow: 'hidden',
        width: window.width * 4,
        marginLeft: -((window.width / 2) * 3),
        height: window.width * 4,
        position: 'absolute',
        bottom: 0,
    }
});