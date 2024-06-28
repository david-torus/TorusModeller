/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {Dropdown} from 'react-native-element-dropdown';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardTypeOptions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {styled} from 'nativewind';
import axios from 'axios';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledStatusBar = styled(StatusBar);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
interface obj {
  label: string;
  dataType: KeyboardTypeOptions;
  type: string;
  isRequired: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
}

import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';
import {Controller, useForm} from 'react-hook-form';

let date = new Date().toISOString();
date = date.split('T')[0];

let data = [
  {
    label: 'Channel ID',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    isDisabled: true,
    defaultValue: 'IBMB',
  },
  {
    label: 'Channel Ref No',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'train Ref No',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Core Banking Ref No',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Passport No',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Ordering Account',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Ordering Account Name',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Beneficiary Account',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Beneficiary Name',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: '',
  },

  {
    label: 'Currency',
    dataType: 'default',
    type: 'input',
    isRequired: true,
    defaultValue: 'USD',
    isDisabled: true,
  },
  {
    label: 'Amount',
    dataType: 'numeric',
    type: 'input',
    isRequired: true,
    defaultValue: 0,
  },
  {
    label: 'Value Date',
    dataType: 'default',
    type: 'date',
    isRequired: true,
    defaultValue: date,
  },
  {
    label: 'Beneficiary Routing No',
    dataType: 'default',
    type: 'dropdown',
    isRequired: true,
    defaultValue: '',
  },
  {
    label: 'Purpose Code',
    dataType: 'default',
    type: 'dropdown',
    isRequired: true,
    defaultValue: '',
  },
];

const CustomInput = (data: obj, control: any) => {
  return (
    <StyledView key={data.label} className={`flex flex-col justify-between  `}>
      <StyledText
        className={`text-md  text-black `}
        style={{
          ...styles.textStyle,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          textAlign: 'left',
        }}>
        {data.label}:
      </StyledText>
      <Controller
        defaultValue={data.defaultValue}
        name={data.label}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            keyboardType={data.dataType}
            editable={!data.isDisabled}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            className={' bg-slate-50/30 backdrop-blur-md text-black W-[100%]'}
            style={{
              ...styles.customInput,
              width: '100%',
              backgroundColor:
                'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,212,255,1) 100%)',
            }}
          />
        )}
        rules={{
          required: {value: data.isRequired, message: 'Field is required!'},
        }}
      />
    </StyledView>
  );
};
const CustomDate = (data: obj, control: any) => {
  const [show, setShow] = useState(false);

  return (
    <StyledView
      key={data.label}
      className="flex flex-col justify-between  w-[100%] ">
      <StyledView>
        <StyledText
          className="text-black text-md"
          style={{...styles.textStyle, width: '40%'}}>
          {data.label}:
        </StyledText>
      </StyledView>
      <TouchableOpacity onPress={() => setShow(true)}>
        <View
          className="flex flex-row bg-slate-50 h-[45px] items-center justify-start px-4 border border-slate-600 rounded-md w-[100%]"
          style={{
            display: 'flex',

            width: '100%',
          }}>
          <Controller
            name={data.label}
            control={control}
            defaultValue={data.defaultValue}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledView className=" justify-items-start items-center ">
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                  }}>
                  <StyledText className="text-black mt-[-5px]">
                    {value}
                  </StyledText>
                </TouchableOpacity>
                <DatePicker
                  mode={'date'}
                  modal
                  open={show}
                  date={new Date(value)}
                  onConfirm={date => {
                    const dateString = date.toISOString();
                    console.log(dateString, 'dateString');
                    const splitDate = dateString.split('T')[0];
                    console.log(splitDate);
                    onChange(splitDate);
                    setShow(false);
                  }}
                  onCancel={() => {
                    setShow(false);
                  }}
                  // style={styles.textStyle}
                />
              </StyledView>
            )}
            rules={{
              required: {value: data.isRequired, message: 'Field is required!'},
            }}
          />
        </View>
      </TouchableOpacity>
    </StyledView>
  );
};
const CustomDropdown = (data: obj, control: any) => {
  const [dropdownData, setDropdownData] = useState([]);

  const getData = async (datas: any) => {
    return await axios
      .get(
        `http://103.26.110.7:4000/initiate-payment/${
          datas.label == 'Beneficiary Routing No' ? 'bankNames' : 'purposeCodes'
        }`,
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    getData(data)
      .then(res => {
        if (res && res.data) {
          setDropdownData(
            res.data.map((item: any) => ({label: item, value: item})),
          );
        } else {
          setDropdownData([]);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [data]);
  return (
    <StyledView
      key={data.label}
      className="flex flex-col justify-start  w-[100%]">
      <StyledText className="text-black w-[100%]" style={styles.textStyle}>
        {data.label}:
      </StyledText>
      <View className="bg-slate-50 h-[45px] flex items-center justify-center px-4 border border-slate-600 rounded-md w-[100%]">
        <Controller
          control={control}
          name={data.label}
          render={({field: {onChange, onBlur, value}}) => (
            <Dropdown
              mode="modal"
              style={{width: '100%'}}
              data={dropdownData}
              placeholderStyle={styles.textStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Bank"
              selectedTextStyle={styles.textStyle}
              itemTextStyle={styles.textStyle}
              value={value}
              onChange={value => {
                onChange(value.value);
              }}
            />
          )}
          rules={{
            required: {value: data.isRequired, message: 'Field is required!'},
          }}
        />
      </View>
    </StyledView>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});

  const cycleTypes = (data: any, control: any) => {
    if (data.type === 'input') {
      return CustomInput(data, control);
    }
    if (data.type === 'dropdown') {
      return CustomDropdown(data, control);
    }
    if (data.type === 'date') {
      return CustomDate(data, control);
    }
  };

  const backgroundStyle = `bg-gradient-to-br from-slate-50 to-blue-500 dark:bg-slate-900 w-[100%] h-[100%]  ${
    keyboardStatus ? 'h-[90%]' : 'h-[88%]'
  }`;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const onSubmit = async (data: any) => {
    try {
      console.log(data, 'data');
      let tranformedData = {
        senderID: data['Channel ID'],
        channelReferenceNumber: data['Channel Ref No'],
        countryOfOrigin: 'US',
        transactionDateTime: new Date().toISOString(),
        middlewareReferenceNumber: data['train Ref No'],
        coreBankReferenceNumber: data['Core Banking Ref No'],
        localInstrument: 'INST',
        organizationId: '',
        organizationSchemeCode: '',
        orgIssuerCode: '',
        BirthDate: '1901-01-01',
        cityOfBirth: 'NewYork',
        countryOfBirth: 'US',
        individualIdentification: data['Passport No'] + '-1100',
        IndividualIdentificationCode: 'NIDN',
        individualIdentificationIssuer: 'US',
        orderingCustomer: {
          account: data['Ordering Account'],
          otheraccount: '',
          accountCur: data['Currency'],
          AccountName: data['Ordering Account Name'],
          companyCode: 'US0010001',
        },
        valueDate: data['Value Date'],
        instructedAmount: data['Amount'],
        coreTransactionType: 'ITNP',
        beneficiaryCustomer: {
          Account: data['Beneficiary Account'],
          otherAccount: '',
          AccountName: data['Beneficiary Name'],
        },
        beneficiaryBankBic: data['Beneficiary Routing No'],
        purposeCode: data['Purpose Code'],
        chargeCode: 'SLEV',
        remittanceInfo: 'Pay to Friend',
        charge: {
          account: '',
          code: '',
          type: '',
          amount: 500.2,
          narration: '',
        },
        vat: {
          account: '0026001636613015',
          amount: 5000.2,
          narration: 'string',
        },
        blotterNumber: '',
        exchangerate: {
          customerRate: 0,
          treasuryRate: 0,
          customerSpread: 0,
        },
        additionalField1: 'string',
        additionalField2: 'string',
        additionalField3: 'string',
        additionalField4: 'string',
        additionalField5: 'string',
        additionalField6: 'string',
        OfflinePostedFlag: 'string',
      };

      let response = await axios.post(
        'http://103.26.110.7:30173/npss-pt/realtime/initiate-payment',
        tranformedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': 'fXv5kxJCiyCQI7LBY7DHFFom066',
            language: 'EN',
            timestamp: '2024-04-10T09:00:00.000',
            'channel-Id': data['Channel ID'],
            'channel-Refno': data['Channel Ref No'],
            'channel-UserId': 'Gss',
            channel_product: 'cp',
            channel_sub_product: 'csp',
            channel_tran_code: 'ctc',
          },
        },
      );
      console.log(response.data);
      if (response.data && response.data.responsecode === '00000') {
        Alert.alert('Success', 'Initiated payment request');
      } else if (response.data && response.data.responsecode === '00001') {
        Alert.alert(
          'Error',
          'Unable to Process request ' + response.data.responseDescription,
        );
      } else if (response.data && response.data.responsecode === '00002') {
        Alert.alert('Error', 'Duplicate Transaction');
      } else if (response.data && response.data.responsecode === '00003') {
        Alert.alert(
          'Error',
          'Participant bank not available :' + data['Beneficiary Routing No'],
        );
      } else if (response.data && response.data.responsecode === '00004') {
        Alert.alert('Error', 'Invalid Purpose  code :' + data['Purpose Code']);
      } else if (response.data && response.data.responsecode === '00005') {
        Alert.alert('Error', 'Invalid Request');
      } else {
        Alert.alert('Error', 'Invalid Request');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <StyledSafeAreaView>
      <StyledStatusBar
        backgroundColor={isDarkMode ? colors.black : colors.white}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <StyledView className="w-full h-[100%] flex ">
        <StyledView
          className={`p-3 h-[100%] flex items-center justify-center bg-[#344C92]`}>
          <StyledView className="w-[90%] flex flex-row items-center justify-center p-1 mb-2 gap-4">
            <Image
              className="w-10 h-10"
              source={require('../assets/logo.png')}
            />
            <StyledText className={`text-3xl text-white `}>
              Initiate Payment
            </StyledText>
          </StyledView>
          <StyledView
            className={`w-full px-5 flex justify-between items-center h-[80%]  bg-white border-50/50 rounded-t-2xl `}>
            <StyledScrollView
              contentInsetAdjustmentBehavior="automatic"
              className="w-full h-full p-3 mb-3">
              {data.map((item, index) => {
                return (
                  <StyledView key={index} className="p-2 mb-2 ">
                    {cycleTypes(item, control)}
                  </StyledView>
                );
              })}
            </StyledScrollView>
          </StyledView>

          <View
            className={`w-full bg-white h-[10%] rounded-b-2xl  flex items-center ${
              keyboardStatus ? 'hidden' : ''
            } `}>
            <TouchableOpacity
              disabled={!isValid}
              className={`w-[80%] mt-4 flex items-center p-3 rounded-md   ${
                isValid ? 'bg-[#1D2856]' : 'bg-[#1D2856]/50'
              } `}
              onPress={handleSubmit(onSubmit)}>
              <Text style={{...styles.textStyle, color: colors.white}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundStyle: {
    backgroundColor: colors.white,
    flex: 1,
  },
  textStyle: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
  },
  buttonSave: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  customInput: {
    borderColor: colors.black,
    borderWidth: 1,
    paddingBottom: 5,
    borderRadius: 5,

    marginEnd: 5,
    marginRight: 50,

    padding: 5,
    fontFamily: fonts.PoppinsRegular,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
