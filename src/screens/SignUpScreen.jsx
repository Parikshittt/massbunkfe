import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, ActivityIndicator, Animated } from "react-native";
import { DarkTheme } from "./themes/DarkTheme";
import SubmitIcon from '../../assets/icons/submit.svg';
import EmailIcon from '../../assets/icons/email.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import { loginCreds } from "../FakeData/loginCredentials";
import CrossIcon from '../../assets/icons/cross.svg';
import TickIcon from '../../assets/icons/tick.svg';
import { OtpInput } from "react-native-otp-entry";

function SignUpScreen({ navigation }) {
    const [isPasswordVisible, updatePasswordVisibility] = useState(true);
    const [email, setEmail] = useState('');
    const [isLoaderVisible, updateLoaderVisibility] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOtpScreen, updateIsOtpScreen] = useState(false);
    const [isPasswordMatching, updateIsPasswordMatching] = useState(false);
    const [isInvalidEmail, updateIsInvalidEmail] = useState(true);
    const [emailMessage, setEmailMessage] = useState('');
    const [isOtpLoaderVisible, updateIsOtpLoaderVisible] = useState(false)

    function enableSignUpButton() {
        if (!isInvalidEmail && isPasswordMatching) {
            return true
        } else {
            return false
        }
    }

    function showAndHidePassword() {
        updatePasswordVisibility(prev => !prev);
    }

    function checkEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const rejectCommonEmailPattern = /@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/;
        const acceptThaparEmailPattern = /@thapar\.edu$/;

        // Reset message if the email field is empty
        if (email.length === 0) {
            setEmailMessage('');
            return;
        }

        // Check if email matches the basic pattern
        if (!emailPattern.test(email)) {
            setEmailMessage('Invalid Email');
            return;
        }

        // Check if the email is a common email
        if (rejectCommonEmailPattern.test(email)) {
            setEmailMessage('Only College Email IDs are allowed :)');
            return;
        }

        // Check if the email is a Thapar email
        if (!acceptThaparEmailPattern.test(email)) {
            setEmailMessage('Coming to your college soon!');
            return;
        }

        // If all checks pass
        setEmailMessage('');
        updateIsInvalidEmail(false);
    }

    function handleSignUp() {
        const user = loginCreds.find(cred => cred.email === email);
        if (!user && isPasswordMatching) {
            updateLoaderVisibility(false)
            console.log('SUCCESS REGISTER, SHOW OTP NOW')
            updateIsOtpScreen(true);
            return;
        } else {
            updateLoaderVisibility(false)
            console.log('FAILED REGISTER')
        }
    }


    useEffect(() => {
        if (password.length >= 8 && confirmPassword.length >= 8 && password === confirmPassword) {
            updateIsPasswordMatching(true);
        } else {
            updateIsPasswordMatching(false);
        }
    }, [password, confirmPassword]);

    function fakeLoaderhandleSignUp() {
        updateLoaderVisibility(true);
        setTimeout(handleSignUp, 2000);
    }

    const handleChange = (inputEmail) => {
        setEmail(inputEmail);
        checkEmail(inputEmail);
    }

    function verifyOtpByUser(otp) {
        updateIsOtpLoaderVisible(true)
        setTimeout(() => {
            if (otp === '1104') {
                console.log('SUCCES OTP, GO TO HOME PAGE')
                updateIsOtpLoaderVisible(false)

            } else {
                console.log('OTP INCORRECT')
                updateIsOtpLoaderVisible(false)
            }
        }, 2000)
    }

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
        errorText: {
            fontFamily: DarkTheme.fonts.regular,
            fontSize: 12,
            color: '#ff0000'
        },
        pinCodeContainer: {
            borderRadius: 0,
            borderColor: DarkTheme.color.tertiary
        },
        pinCodeText: {
            fontFamily: DarkTheme.fonts.bold,
            color: DarkTheme.color.tertiary,
            margin: 0
        },
        smallText: {
            fontFamily: DarkTheme.fonts.regular,
            fontSize: 12,
            color: DarkTheme.color.tertiary,
        },
        smallTextButton: {
            fontFamily: DarkTheme.fonts.regular,
            fontSize: 12,
            color: DarkTheme.color.tertiary,
            textDecorationLine: 'underline'
        }
    });
    //Styling Section ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    const VerifyOtpScreen = () => {
        return (
            <>
                <Text style={styles.smallText}>If the email is correct, you will receive an OTP</Text>
                {!isOtpLoaderVisible ?
                    <>
                        <OtpInput
                            numberOfDigits={4}
                            focusColor="green"
                            focusStickBlinkingDuration={500}
                            onTextChange={(text) => console.log(text)}
                            onFilled={(text) => verifyOtpByUser(text)}
                            textInputProps={{
                                accessibilityLabel: "One-Time Password",
                            }}
                            theme={{
                                pinCodeContainerStyle: styles.pinCodeContainer,
                                pinCodeTextStyle: styles.pinCodeText,
                            }}
                        />
                        <TouchableOpacity>
                            <Text style={styles.smallTextButton} onPress={() => { updateIsOtpScreen(false) }}>I want to change email id</Text>
                        </TouchableOpacity>
                    </>
                    : <ActivityIndicator size={"large"} color={DarkTheme.color.tertiary} />
                }
            </>
        )
    }

    return (
        <SafeAreaView style={styles.mainBG}>
            <View style={styles.mainContainer}>
                <Text style={styles.appName}>Mass Bunk</Text>
                <Text style={styles.loginText}>{isOtpScreen ? 'ENTER OTP' : 'SIGN UP'}</Text>
                {
                    !isOtpScreen
                        ? <>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="college email"
                                    style={styles.loginSignUpInput}
                                    placeholderTextColor={DarkTheme.color.primary}
                                    keyboardType="email-address"
                                    value={email}
                                    onChange={e => handleChange(e.nativeEvent.text)}
                                />
                                <View style={styles.suffixIcon}>
                                    <EmailIcon />
                                </View>
                            </View>
                            {emailMessage
                                ? <Text style={styles.errorText} >{emailMessage}</Text>
                                : <></>
                            }
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="password (>= 8 characters)"
                                    autoComplete="off"
                                    style={styles.loginSignUpInput}
                                    secureTextEntry={isPasswordVisible}
                                    placeholderTextColor={DarkTheme.color.primary}
                                    keyboardType='default'
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                    }
                                    }
                                />
                                <TouchableOpacity onPress={showAndHidePassword} activeOpacity={1}>
                                    <View style={styles.suffixIcon}>
                                        <EyeIcon />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="confirm passsword"
                                    autoComplete="off"
                                    style={styles.loginSignUpInput}
                                    secureTextEntry={false}
                                    placeholderTextColor={DarkTheme.color.primary}
                                    keyboardType='default'
                                    value={confirmPassword}
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);
                                    }
                                    }
                                />
                                <View style={styles.suffixIcon}>
                                    {
                                        isPasswordMatching
                                            ? <TickIcon />   // Show TickIcon when passwords match
                                            : <CrossIcon />   // Show CrossIcon when passwords don't match
                                    }
                                </View>

                            </View>
                        </>
                        : <VerifyOtpScreen />
                }

                {!isOtpScreen ?
                    <TouchableOpacity
                        style={[
                            styles.submitIcon,
                            { backgroundColor: !enableSignUpButton() ? 'grey' : DarkTheme.color.tertiary },
                        ]} disabled={!enableSignUpButton()} onPress={
                            fakeLoaderhandleSignUp}>
                        {isLoaderVisible
                            ? <ActivityIndicator size={"small"} color="#121212" />
                            : <SubmitIcon />}
                    </TouchableOpacity>
                    : <></>
                }
            </View>

            {
                !isOtpScreen ?
                    <TouchableOpacity style={styles.switchToLoginSignUpTextButton} onPress={() => {
                        navigation.navigate('LoginScreen');
                    }}>
                        <Text style={styles.switchToLoginSignUpText}>Already have an account ? Log In!</Text>
                    </TouchableOpacity>
                    : <></>
            }
        </SafeAreaView>
    );
}

export default SignUpScreen;
