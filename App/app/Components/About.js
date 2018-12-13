import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    RefreshControl,
    Dimensions,
    ImageBackground,
    ToastAndroid,
    ScrollView
} from 'react-native';
import {
    Container,
    Left,
    Thumbnail,
    Header,
    Button,
    Title,
    Body,
    Icon,
    Right,
    List,
} from 'native-base';
import { about } from '../dataService';
import { baseDetails } from '../baseDetails';
import InternetCheck from '../InternetCheck';

const screenWidth = Dimensions.get('window').width;

// Google analytics
// import {
//   GoogleAnalyticsTracker,
//   GoogleTagManager,
//   GoogleAnalyticsSettings
// } from "react-native-google-analytics-bridge";
// let tracker1 = new GoogleAnalyticsTracker("UA-130489978-1");
// tracker1.trackScreenView("About");
// GoogleAnalyticsSettings.setDispatchInterval(30);

export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            refreshing: true,
            isError: false,
            data: [],
            currentPage: 'About'
        }
    }

    render() {
        return (
            <ImageBackground
                source={
                    require('../assets/img/bg-img.png')
                }
                style={{
                    width: '100%',
                    height: '100%',
                    resize: 'cover'
                }}>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <InternetCheck />
                    <Header style={{ backgroundColor: '#24292e00' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='md-menu' style={{ color: "#ffffff" }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{
                                color: "#ffffff",
                                fontFamily: 'LemonJellyPersonalUse',
                                fontSize: 35,
                                lineHeight: 30
                            }}>
                                About
                        </Title>
                        </Body>
                        <Right />
                    </Header>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.pageLoading}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }>
                        {this.state.data.app_name ? <View style={{ padding: 15 }}>
                            <View style={{
                                flexDirection: 'row',
                            }}    >
                                <Thumbnail style={{ borderRadius: 5 }} square source={{ uri: this.state.data.thumbnail }} />
                                <View style={{
                                    flexDirection: 'column',
                                    paddingLeft: 15,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 35,
                                        lineHeight: 30,
                                        fontFamily: 'LemonJellyPersonalUse',
                                    }}>{this.state.data.app_name}</Text>
                                    <Text style={{
                                        color: 'white',
                                    }} >V{baseDetails.versionCode}</Text>
                                </View>
                            </View>

                            <View style={{ paddingVertical: 5, paddingTop: 15 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Founder : </Text>
                                <Text style={{ color: 'white', fontSize: 16 }}>{this.state.data.Author}</Text>
                            </View>

                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Email : </Text>
                                <Text style={{ color: 'white', fontSize: 16 }}>{this.state.data.Email}</Text>
                            </View>

                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Description : </Text>
                                <Text style={{ color: 'white', fontSize: 16, textAlign: 'justify' }}>{this.state.data.about}</Text>
                            </View>
                        </View> : null}
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }

    componentDidMount() {
        this.getAboutus();
    }

    onRefresh() {
        this.getAboutus();
    }

    getAboutus() {
        this.setState({ pageLoading: true });
        about()
            .then(res => {
                this.setState({ pageLoading: false });
                this.setState({ data: res });
            })
    }
}