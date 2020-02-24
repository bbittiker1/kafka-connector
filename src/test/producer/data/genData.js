
const dtmData = require("./deviceTypeManufacturer");

/*
fingerprint changed message

{
   "device_id":"28-FF-3C-7B258B8168B27EF75ADCBB8B7121FC4575DBC94D2FB07BCB989503696DB0EE0A",
   "router_id":"AC-84-C6-2D0CB45BD46F351B15907393F84CBE438C984687139C1CBFB6D0D80D6B2294EF",
   "device_name":"iPhone-x",
   "os":"iOS",
   "aff_id":"1234",
   "device_type":"Phone",
   "manufacturer":"Apple",
   "confidence":100,
   "device_model":"iPhoneX",
   "event_type":"fingerprint_changed"
}

router upload / new device(s) message

{
   "router_id":"64-CC-22-F589C63AEDF6255C44FB24123607F98F7287A77154C19A1F07559A5E2BF6AB3B",
   "upload_type":"1",
   "devices":[
      {
         "id":"38-F9-D3-9992E182A47120C1EDD05D2B213E95B1C7A68E5B92E3DFD6653255AFEEE1B3B1",
         "mac":"38:F9:D3:D3:26:CD",
         "ip_address":"35.35.1.153",
         "ip6_address":"[]",
         "host_name":"C02YP1KUJHD2",
         "status":1,
         "last_seen":1580280349,
         "trusted":0
      },
      {
         "id":"48-D7-05-3B10FDEEF9C3F50CDCA37DDEC338A8D3EE70B24DD549F3A2F85FFB3940AC060D",
         "mac":"48:D7:05:E3:7B:FF",
         "ip_address":"35.35.1.165",
         "ip6_address":"[]",
         "host_name":"Shakils-Air",
         "status":1,
         "last_seen":1580280349,
         "trusted":0
      },
      {
         "id":"78-4F-43-C6116B7F4B74BF3D8E9FDFFABA41DE089F0168EA6D34E9E3F102E0B4E9D620F3",
         "mac":"78:4F:43:86:3A:B6",
         "ip_address":"35.35.1.158",
         "ip6_address":"[]",
         "host_name":"C02T94K3GTFM",
         "status":1,
         "last_seen":1580280349,
         "trusted":0
      },
      {
         "id":"88-28-B3-472A7CF31C936B56AAE1154597D48F449B6B58E0F62D9B1C2988265A74AA2ECF",
         "mac":"88:28:B3:3F:43:15",
         "ip_address":"35.35.1.169",
         "ip6_address":"[]",
         "host_name":"",
         "status":1,
         "last_seen":1580280349,
         "trusted":0
      }
   ]
}
 */

const deviceTypeManufacturer = dtmData.data;


const genStr= (length, useNums = false) => {
    var result           = '';
    var allCharacters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var allNums = "0123456789";

    var chars = (useNums) ? allNums: allCharacters;
    var charsLength = chars.length;

    for ( var i = 0; i < length; i++ ) {
        // TODO: THIS CAN BE IMPROVED
        result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
};

const genMac = () => {
    var result           = '';
    var allCharacters       = "ABCDEF";
    var allNums = "0123456789";
    const a = [];
    for(let x = 0; x < 6; x++) {
        const char1 = allNums.charAt(Math.floor(Math.random() * allNums.length));
        const char2 = allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));

        a.push(char1 + char2);
    }

    return a.join(":");
};

const getRandomDeviceTypeManufacturer = () => {
  return Math.floor(Math.random() * (deviceTypeManufacturer.length - 1));
};

// TODO: AUTOMATE THIS!!!!
const eventType = 'fingerprint_changed';

console.log("{ \"data\": [");

for(let i = 0; i < 100; i++) {
    const deviceTypeMan = deviceTypeManufacturer[getRandomDeviceTypeManufacturer()];

    let output = {};

    if(eventType === 'new_device') {

        output = {
            "router_id": `${genStr(2)}-${genStr(2)}-${genStr(2)}-${genStr(64)}`.toUpperCase(),
            "event_type": "new_device",
            "did": `${genStr(2)}-${genStr(2)}-${genStr(2)}-${genStr(64)}`.toUpperCase(),
            "ip": `${genStr(2, true)}.${genStr(2, true)}.${genStr(1, true)}.${genStr(2, true)}`,
            "tot_dev_cnt": 7,
            "hostname": `${genStr(10)}`.toUpperCase(),
            "aff_id": "756",
            "topic": "new_device",
            "mac": `${genMac()}`,
            "account_id": `${genStr(8)}-${genStr(4)}-${genStr(4)}-${genStr(4)}-${genStr(11)}`,
            "type": deviceTypeMan.device_type,
            "manufacturer": deviceTypeMan.device_manufacturer,
            "model": "",
            "icon": ""
        };
    }

    if(eventType === 'fingerprint_changed') {
        output = {
            "device_id": `${genStr(2)}-${genStr(2)}-${genStr(2)}-${genStr(64)}`.toUpperCase(),
            "router_id":  `${genStr(2)}-${genStr(2)}-${genStr(2)}-${genStr(64)}`.toUpperCase(),
            "device_name": "iPhone-x",
            "os": "iOS",
            "aff_id": "1234",
            "device_type": deviceTypeMan.device_type,
            "manufacturer": deviceTypeMan.device_manufacturer,
            "confidence": 1,
            "device_model": "iPhoneX",
            "event_type": "fingerprint_changed"
        };
    }

    console.log(JSON.stringify(output));

    if(i !== 99) {
        console.log(",");
    }
}

console.log("]}");
