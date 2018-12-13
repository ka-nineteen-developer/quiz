import React from 'react';
import {
    createStackNavigator,
    DrawerItems,
    createDrawerNavigator
} from 'react-navigation';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Linking,
} from 'react-native';
import {
    Icon,
} from 'native-base';
import Quotes from './Components/Quotes';
import About from './Components/About';
import PlayGame from './Components/PlayGame';
import { baseDetails } from './baseDetails';

const CustomDrawerContentComponent = (props) => (
    <View style={{ flex: 1 }}>
        <View style={{
            flexDirection: 'row',
            padding: 15,
            alignItems: 'center',
            borderBottomColor: '#3ab07e',
            borderBottomWidth: 0.3
        }}>
            <Image source={require('./assets/img/icon.png')}
                style={{
                    width: 70,
                    height: 70,
                }} />
                
            <Text style={{
                fontSize: 50,
                lineHeight: 46,
                paddingLeft: 15,
                color: '#ffffff',
                fontFamily: 'LemonJellyPersonalUse'
            }}> Quotes</Text>
        </View>
        <DrawerItems {...props}
            drawerBackgroundColor={{ color: '#000000' }}
            labelStyle={{
                color: '#ffffff',
                fontSize: 30,
                lineHeight: 25,
                fontFamily: 'LemonJellyPersonalUse',
                fontWeight: 'normal',
            }}
            activeLabelStyle={{
                color: '#ffffff',
            }}
        />

        <TouchableOpacity style={{
            flexDirection: 'row',
            paddingHorizontal: 17,
            paddingVertical: 10,
        }} onPress={() => {
            Linking.canOpenURL(baseDetails.appUrl).then(supproted => {
                if (supproted) {
                    return Linking.openURL(baseDetails.appUrl);
                } else {
                    ToastAndroid.show('Something went wrong...', ToastAndroid.SHORT);
                }
            })
        }}>
            <View style={{ width: 22 }}>
                <Icon active name="star-half" style={{
                    color: '#ffffff',
                    fontSize: 18,
                    textAlign: 'center',
                }} />
            </View>
            <Text style={{
                fontSize: 30,
                lineHeight: 25,
                fontFamily: 'LemonJellyPersonalUse',
                color: '#ffffff',
                fontWeight: 'normal',
                paddingLeft: 30
            }}
            >Rate App
            </Text>
        </TouchableOpacity>

        <Text style={{
            position: 'absolute',
            bottom: 0,
            paddingVertical: 5,
            color: 'gray',
            width: '100%',
            textAlign: 'center',
        }}>v{baseDetails.versionCode}</Text>
    </View>
);

const playQuizScreen = createStackNavigator({
    Home: {
        screen: Quotes,
        navigationOptions:{
            header: null
        }
    },
    PlayGame: {
        screen: PlayGame,
        navigationOptions:{
            header: null
        }
    }
})

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: playQuizScreen,
        navigationOptions: {
            header: null,
            drawerIcon: (
                <Icon active name="home" style={{
                    color: '#ffffff',
                    fontSize: 18,
                    textAlign: 'center'
                }} />
            )
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            header: null,
            drawerIcon: (
                <Icon active name="document" style={{
                    color: '#ffffff',
                    fontSize: 18,
                    textAlign: 'center'
                }} />
            )
        }
    },
},
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'Drawerclose',
        drawerToggleRoute: 'DrawerToggle',
        drawerBackgroundColor: "#252525",
    }
)