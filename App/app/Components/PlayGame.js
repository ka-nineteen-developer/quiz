import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    StatusBar,
    ProgressBarAndroid,
    Modal,
    Dimensions,
    Alert,
    ScrollView,
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

const window = Dimensions.get('window');

export default class PlayGame extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    color="#2196F3"
                    indeterminate={false}
                    progress={0.5} />
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    justifyContent: 'space-between'
                }}>
                    <Text>00:30</Text>
                    <Text>Entertainment: Video Games</Text>
                    <Text>1/10</Text>
                </View>
                {/* <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-end'
                }}> */}
                <View style={{
                    backgroundColor: 'yellow',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        padding: 10,
                        textAlign: 'center'
                    }}>In &quot;Overwatch,&quot; an allied McCree will say &quot;Step right up&quot; upon using his ultimate ability Deadeye.In &quot;Overwatch,&quot; an allied McCree will say &quot;Step right up&quot; upon using his ultimate ability Deadeye.</Text>
                    <FlatList
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-end'
                        }}
                        data={[{
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
                        }]}
                        numColumns={2}
                        keyExtractor={(item, index) => item.id}
                        renderItem={(item) => (
                            <View style={{
                                width: window.width / 2,
                                backgroundColor: 'red'
                            }}
                            >
                                <TouchableOpacity style={{
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                }}>
                                    <Card>
                                        <CardItem>
                                            <Text>asd</Text>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                {/* </ScrollView> */}
            </View>
        );
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.quizData);
        console.log(this.props.navigation.state.routeName);
    }
}