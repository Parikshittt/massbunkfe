import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, ActivityIndicator, Animated } from "react-native";
import { DarkTheme } from "./themes/DarkTheme";
import SubmitIcon from '../../assets/icons/submit.svg';
import EmailIcon from '../../assets/icons/email.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import { loginCreds } from "../FakeData/loginCredentials";

function LoginScreen({ navigation }) {
    const [isPasswordVisible, updatePasswordVisibility] = useState(true);
    const [email, setEmail] = useState('');
    const [isLoaderVisible, updateLoaderVisibility] = useState(false);
    const [password, setPassword] = useState('');
    // Animated value for color transition
    const colorAnim = useRef(new Animated.Value(0)).current; // Starts from 0
    function changeMassBunkLogoToRed() {
        // Animate the color from 0 (initial state) to 1 (red)
        Animated.timing(colorAnim, {
            toValue: 1, // Final value
            duration: 500, // Duration of the transition in ms
            useNativeDriver: false,
        }).start(() => {
            // After 2 seconds, transition back to the original color
            setTimeout(() => {
                Animated.timing(colorAnim, {
                    toValue: 0, // Go back to original color
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }, 2000);
        });
    }

    function showAndHidePassword() {
        updatePasswordVisibility(prev => !prev);
    }

    function handleLogin() {
        const user = loginCreds.find(cred => cred.email === email && cred.password === password);

        if (user) {
            console.log('SUCCESS');
        } else {
            console.log('FALSE');
            changeMassBunkLogoToRed();
        }
        updateLoaderVisibility(false);
    }

    function fakeLoaderHandleLogin() {
        updateLoaderVisibility(true);
        setTimeout(handleLogin, 2000);
    }

    const interpolatedColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [DarkTheme.color.tertiary, '#ff0000'],
    });

    //Styling Section ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    const styles = StyleSheet.create({
        mainBG: {
            display: 'flex',
            height: '100%',
            width: '100%',
            paddingTop: 90,
            paddingBottom: 50,
            paddingHorizontal: 15,
            backgroundColor: DarkTheme.color.primary,
            gap: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        mainContainer: {
            display: 'flex',
            backgroundColor: DarkTheme.color.primary,
            gap: 15,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        appName: {
            color: DarkTheme.color.tertiary,
            fontFamily: DarkTheme.fonts.vintage,
            fontSize: 44,
            textAlign: 'center',
        },
        loginText: {
            color: DarkTheme.color.tertiary,
            fontSize: 16,
            fontFamily: DarkTheme.fonts.regular,
            textAlign: 'center',
        },
        loginSignUpInput: {
            display: 'flex',
            padding: 15,
            color: DarkTheme.color.primary,
            fontFamily: DarkTheme.fonts.regular,
            fontSize: 16,
            backgroundColor: DarkTheme.color.tertiary,
            flex: 1,
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: 60,
            width: '100%',
        },
        suffixIcon: {
            aspectRatio: 1,
            height: '100%',
            backgroundColor: DarkTheme.color.tertiary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        submitIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            aspectRatio: 1,
            padding: 10,
            borderRadius: 100,
            backgroundColor: DarkTheme.color.tertiary,
        },
        switchToLoginSignUpText: {
            fontFamily: DarkTheme.fonts.regular,
            fontSize: 8,
            color: DarkTheme.color.tertiary,
        },
        switchToLoginSignUpTextButton: {
            backgroundColor: DarkTheme.color.primary,
            borderRadius: 100,
            padding: 5,
            borderWidth: 1,
            borderColor: DarkTheme.color.tertiary,
        },
    });
    //Styling Section ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    return (
        <SafeAreaView style={styles.mainBG}>
            <View style={styles.mainContainer}>
                <Animated.Text style={[styles.appName, { color: interpolatedColor }]}>Mass Bunk</Animated.Text>
                <Text style={styles.loginText}>LOGIN</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="college email"
                        autoComplete="off"
                        style={styles.loginSignUpInput}
                        placeholderTextColor={DarkTheme.color.primary}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <View style={styles.suffixIcon}>
                        <EmailIcon />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="password"
                        autoComplete="off"
                        style={styles.loginSignUpInput}
                        secureTextEntry={isPasswordVisible}
                        placeholderTextColor={DarkTheme.color.primary}
                        keyboardType="default"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity onPress={showAndHidePassword} activeOpacity={1}>
                        <View style={styles.suffixIcon}>
                            <EyeIcon />
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitIcon} onPress={fakeLoaderHandleLogin}>
                    {isLoaderVisible
                        ? <ActivityIndicator size={"small"} color="#121212" />
                        : <SubmitIcon />}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.switchToLoginSignUpTextButton} onPress={() => {
                navigation.replace('SignUpScreen');
            }}>
                <Text style={styles.switchToLoginSignUpText}>Not Registered Yet? Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default LoginScreen;
