import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header4, section, content', {isWeb}));
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    if (!props.content) {
        useEffect(() => {
            setContent(getContent({type: 'content', uid: 'volunteer'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            }));
        }, [])
    }

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={[styles.section, {backgroundColor: Theme.green_bg, paddingTop: 180}]}>
                    <View style={[styles.content, {flexDirection: 'column', alignItems: 'center'}]}>
                        <Text accessibilityRole="header" aria-level="2" style={[styles.text_header2, {color: '#fff'}]}>{content.page_title}</Text>
                    </View>
                </View>
                <View style={[styles.section, {paddingBottom: 0, paddingTop: dimensions.width < 900 ? 40 : 80}]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} markupStyle={'fancy'} bullet={'check'}/>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <View style={[{flex: 1, backgroundColor: '#000', width: '100%', flexDirection: dimensions.width < 900 ? 'column': 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                            <View style={{flex: 3, padding: 20}}>
                                <Text style={[styles.text_header4, {color: '#fff'}]}>
                                    The biggest impact we can all have is by getting as many people as possible to patron a business that we have listed.
                                </Text>
                            </View>
                            <View style={{flex: 1, padding: 20, justifyContent: 'flex-end'}}>
                                <View style={{flex: 1}}>
                                    <Link button={'button_green'} href="https://forms.gle/vJ114r7J3JkE8jrs9" title="Volunteer Form" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;