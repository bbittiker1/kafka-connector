
const deviceTypeManufacturer = [
    { device_type: 'Alarm', device_manufacturer: 'Honeywell' } ,
    { device_type: 'Audio Bridge', device_manufacturer: 'Control4' } ,
    { device_type: 'AV Receiver', device_manufacturer: 'Denon' } ,
    { device_type: 'AV Receiver', device_manufacturer: 'Marantz' } ,
    { device_type: 'AV Receiver', device_manufacturer: 'Onkyo' } ,
    { device_type: 'AV Receiver', device_manufacturer: 'Pioneer' } ,
    { device_type: 'AV Receiver', device_manufacturer: 'Sony' } ,
    {
        device_type: 'AV Receiver',
        device_manufacturer: 'Yamaha Corporation'
    } ,
    { device_type: 'BasePort', device_manufacturer: 'MitraStar' } ,
    { device_type: 'Camera', device_manufacturer: '' } ,
    { device_type: 'Camera', device_manufacturer: '2GIG' } ,
    { device_type: 'Camera', device_manufacturer: 'Arlo' } ,
    { device_type: 'Camera', device_manufacturer: 'Belkin' } ,
    { device_type: 'Camera', device_manufacturer: 'D-Link' } ,
    { device_type: 'Camera', device_manufacturer: 'Dropcam' } ,
    { device_type: 'Camera', device_manufacturer: 'Ezviz' } ,
    { device_type: 'Camera', device_manufacturer: 'Hikvision' } ,
    { device_type: 'Camera', device_manufacturer: 'JSW Pacific' } ,
    { device_type: 'Camera', device_manufacturer: 'Logitech' } ,
    { device_type: 'Camera', device_manufacturer: 'Momentum' } ,
    { device_type: 'Camera', device_manufacturer: 'Netgear' } ,
    { device_type: 'Camera', device_manufacturer: 'Oplink' } ,
    { device_type: 'Camera', device_manufacturer: 'Panasonic' } ,
    { device_type: 'Camera', device_manufacturer: 'Petcube' } ,
    { device_type: 'Camera', device_manufacturer: 'Petzi' } ,
    { device_type: 'Camera', device_manufacturer: 'Philips' } ,
    { device_type: 'Camera', device_manufacturer: 'Ring' } ,
    { device_type: 'Camera', device_manufacturer: 'Samsung' } ,
    { device_type: 'Camera', device_manufacturer: 'Sercomm' } ,
    { device_type: 'Camera', device_manufacturer: 'Somfy' } ,
    { device_type: 'Camera', device_manufacturer: 'Sony' } ,
    { device_type: 'Camera', device_manufacturer: 'TP-LINK' } ,
    { device_type: 'Camera', device_manufacturer: 'Vivotek' } ,
    { device_type: 'Crypto Miner', device_manufacturer: '' } ,
    {
        device_type: 'Development Board',
        device_manufacturer: 'Raspberry Pi'
    } ,
    { device_type: 'Doorbell', device_manufacturer: 'August' } ,
    { device_type: 'Doorbell', device_manufacturer: 'Ring' } ,
    { device_type: 'DVR', device_manufacturer: '' } ,
    { device_type: 'DVR', device_manufacturer: 'Dish Network' } ,
    { device_type: 'DVR', device_manufacturer: 'Hikvision' } ,
    { device_type: 'DVR', device_manufacturer: 'TiVo' } ,
    { device_type: 'E-Reader', device_manufacturer: 'Amazon' } ,
    { device_type: 'Gaming', device_manufacturer: '' } ,
    { device_type: 'Gaming', device_manufacturer: 'LeapFrog' } ,
    { device_type: 'Gaming', device_manufacturer: 'Microsoft' } ,
    { device_type: 'Gaming', device_manufacturer: 'Nintendo' } ,
    { device_type: 'Gaming', device_manufacturer: 'Sony' } ,
    { device_type: 'Gaming', device_manufacturer: 'Valve Corporation' } ,
    { device_type: 'Gateway', device_manufacturer: 'Verizon' } ,
    { device_type: 'Home Energy', device_manufacturer: 'Enphase Energy' } ,
    { device_type: 'Home Theater', device_manufacturer: 'Samsung' } ,
    { device_type: 'Home Theater', device_manufacturer: 'Sony' } ,
    { device_type: 'IOT', device_manufacturer: '' } ,
    { device_type: 'IOT', device_manufacturer: 'Espressif' } ,
    { device_type: 'IOT', device_manufacturer: 'Fitbit' } ,
    { device_type: 'IOT', device_manufacturer: 'GainSpan' } ,
    { device_type: 'IOT', device_manufacturer: 'Lutron' } ,
    { device_type: 'IOT', device_manufacturer: 'Netatmo' } ,
    { device_type: 'IOT', device_manufacturer: 'Rotimatic' } ,
    { device_type: 'IOT', device_manufacturer: 'Sleeptracker' } ,
    { device_type: 'IOT', device_manufacturer: 'Thermomix' } ,
    { device_type: 'Light', device_manufacturer: 'GreenWave' } ,
    { device_type: 'Light', device_manufacturer: 'Koogeek' } ,
    { device_type: 'Light', device_manufacturer: 'LIFX' } ,
    { device_type: 'Light', device_manufacturer: 'Osram' } ,
    { device_type: 'Light', device_manufacturer: 'TP-LINK' } ,
    { device_type: 'Light', device_manufacturer: 'Xiaomi' } ,
    { device_type: 'Multimedia Extender', device_manufacturer: 'Netgear' } ,
    { device_type: 'Multimedia Extender', device_manufacturer: 'Sonos' } ,
    { device_type: 'Network Adapter', device_manufacturer: 'Netgear' } ,
    { device_type: 'Network Extender', device_manufacturer: '' } ,
    {
        device_type: 'Network Extender',
        device_manufacturer: 'Actiontec Electronics'
    } ,
    { device_type: 'Network Extender', device_manufacturer: 'Arris' } ,
    { device_type: 'Network Extender', device_manufacturer: 'Asus' } ,
    { device_type: 'Network Extender', device_manufacturer: 'AVM' } ,
    { device_type: 'Network Extender', device_manufacturer: 'Devolo' } ,
    { device_type: 'Network Extender', device_manufacturer: 'Devolo AG' } ,
    { device_type: 'Network Extender', device_manufacturer: 'Linksys' } ,
    { device_type: 'Network Extender', device_manufacturer: 'Netgear' } ,
    { device_type: 'Network Extender', device_manufacturer: 'TP-LINK' } ,
    { device_type: 'Network Extender', device_manufacturer: 'Xiaomi' } ,
    { device_type: 'Network Monitor', device_manufacturer: 'Circle Media' } ,
    { device_type: 'Player', device_manufacturer: 'Apple' } ,
    { device_type: 'Player', device_manufacturer: 'Samsung' } ,
    { device_type: 'Player', device_manufacturer: 'Sony' } ,
    { device_type: 'Printer', device_manufacturer: '' } ,
    { device_type: 'Printer', device_manufacturer: 'Brother' } ,
    { device_type: 'Printer', device_manufacturer: 'Canon' } ,
    { device_type: 'Printer', device_manufacturer: 'Dell' } ,
    { device_type: 'Printer', device_manufacturer: 'Epson' } ,
    { device_type: 'Printer', device_manufacturer: 'Kodak' } ,
    { device_type: 'Printer', device_manufacturer: 'Samsung' } ,
    { device_type: 'Printer', device_manufacturer: 'Xerox' } ,
    { device_type: 'Roti Maker', device_manufacturer: 'Rotimatic' } ,
    { device_type: 'Router', device_manufacturer: '' } ,
    { device_type: 'Router', device_manufacturer: 'Actiontec Electronics' } ,
    { device_type: 'Router', device_manufacturer: 'AirTies' } ,
    { device_type: 'Router', device_manufacturer: 'AmpliFi' } ,
    { device_type: 'Router', device_manufacturer: 'Apple' } ,
    { device_type: 'Router', device_manufacturer: 'Araknis Networks' } ,
    { device_type: 'Router', device_manufacturer: 'Arris' } ,
    { device_type: 'Router', device_manufacturer: 'Asus' } ,
    { device_type: 'Router', device_manufacturer: 'AVM Audiovisuelles' } ,
    { device_type: 'Router', device_manufacturer: 'Belkin' } ,
    { device_type: 'Router', device_manufacturer: 'Bitmain' } ,
    { device_type: 'Router', device_manufacturer: 'Broadcom' } ,
    { device_type: 'Router', device_manufacturer: 'Cambium Networks' } ,
    { device_type: 'Router', device_manufacturer: 'Cisco' } ,
    { device_type: 'Router', device_manufacturer: 'Dish Network' } ,
    { device_type: 'Router', device_manufacturer: 'D-Link' } ,
    { device_type: 'Router', device_manufacturer: 'Eero' } ,
    { device_type: 'Router', device_manufacturer: 'GreenWave' } ,
    { device_type: 'Router', device_manufacturer: 'Honeywell' } ,
    { device_type: 'Router', device_manufacturer: 'Linksys' } ,
    { device_type: 'Router', device_manufacturer: 'Luxul' } ,
    { device_type: 'Router', device_manufacturer: 'Netgear' } ,
    { device_type: 'Router', device_manufacturer: 'Ralink' } ,
    { device_type: 'Router', device_manufacturer: 'Realtek' } ,
    { device_type: 'Router', device_manufacturer: 'Ring' } ,
    { device_type: 'Router', device_manufacturer: 'Sagemcom' } ,
    { device_type: 'Router', device_manufacturer: 'Technicolor' } ,
    { device_type: 'Router', device_manufacturer: 'Tenda Technology' } ,
    { device_type: 'Router', device_manufacturer: 'TP-LINK' } ,
    { device_type: 'Router', device_manufacturer: 'Ubiquiti Networks' } ,
    { device_type: 'Router', device_manufacturer: 'Verizon' } ,
    { device_type: 'Router', device_manufacturer: 'Western Digital' } ,
    { device_type: 'Security Controller', device_manufacturer: 'Control4' } ,
    {
        device_type: 'Security Controller',
        device_manufacturer: 'Honeywell'
    } ,
    { device_type: 'Security Controller', device_manufacturer: 'Vivint' } ,
    { device_type: 'Smart Bed', device_manufacturer: 'Select Comfort' } ,
    { device_type: 'Smart Home Device', device_manufacturer: 'D-Link' } ,
    { device_type: 'Smart Hub', device_manufacturer: 'Chamberlain' } ,
    { device_type: 'Smart Hub', device_manufacturer: 'Hive' } ,
    { device_type: 'Smart Hub', device_manufacturer: 'Logitech' } ,
    { device_type: 'Smart Hub', device_manufacturer: 'Netgear' } ,
    { device_type: 'Smart Hub', device_manufacturer: 'Panasonic' } ,
    { device_type: 'Smart Hub', device_manufacturer: 'Philips' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'BroadLink' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'Cisco' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'Devolo' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'D-Link' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'iHome' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'Koogeek' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'Meross' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'Sercomm' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'TP-LINK' } ,
    { device_type: 'Smart Plug', device_manufacturer: 'Zinwell' } ,
    { device_type: 'Smart Scale', device_manufacturer: 'Fitbit' } ,
    { device_type: 'Speaker', device_manufacturer: '' } ,
    { device_type: 'Speaker', device_manufacturer: 'Bose' } ,
    { device_type: 'Speaker', device_manufacturer: 'Denon' } ,
    { device_type: 'Speaker', device_manufacturer: 'Google' } ,
    { device_type: 'Speaker', device_manufacturer: 'Logitech' } ,
    { device_type: 'Speaker', device_manufacturer: 'Philips' } ,
    { device_type: 'Speaker', device_manufacturer: 'Phorus' } ,
    { device_type: 'Speaker', device_manufacturer: 'Samsung' } ,
    { device_type: 'Speaker', device_manufacturer: 'Sonos' } ,
    { device_type: 'Speaker', device_manufacturer: 'Sony' } ,
    { device_type: 'Speaker', device_manufacturer: 'Vizio' } ,
    { device_type: 'Sprinkler', device_manufacturer: 'Orbit Irrigation' } ,
    { device_type: 'Sprinkler', device_manufacturer: 'Rachio' } ,
    { device_type: 'STB', device_manufacturer: '' } ,
    { device_type: 'STB', device_manufacturer: 'Arris' } ,
    { device_type: 'STB', device_manufacturer: 'Cisco' } ,
    { device_type: 'STB', device_manufacturer: 'DirecTV' } ,
    { device_type: 'STB', device_manufacturer: 'Dish Network' } ,
    { device_type: 'STB', device_manufacturer: 'Humax' } ,
    { device_type: 'STB', device_manufacturer: 'Movistar' } ,
    { device_type: 'STB', device_manufacturer: 'Samsung' } ,
    { device_type: 'STB', device_manufacturer: 'Silicondust' } ,
    { device_type: 'STB', device_manufacturer: 'Technicolor' } ,
    { device_type: 'STB', device_manufacturer: 'Thomson' } ,
    { device_type: 'STB', device_manufacturer: 'Vestel' } ,
    { device_type: 'STB', device_manufacturer: 'Zyxel' } ,
    { device_type: 'Storage', device_manufacturer: '' } ,
    { device_type: 'Storage', device_manufacturer: 'Buffalo' } ,
    { device_type: 'Storage', device_manufacturer: 'D-Link' } ,
    { device_type: 'Storage', device_manufacturer: 'QNAP' } ,
    { device_type: 'Storage', device_manufacturer: 'Space Monkey' } ,
    { device_type: 'Storage', device_manufacturer: 'Western Digital' } ,
    { device_type: 'Storage', device_manufacturer: 'Zyxel' } ,
    { device_type: 'Streaming', device_manufacturer: '' } ,
    { device_type: 'Streaming', device_manufacturer: 'AirTV' } ,
    { device_type: 'Streaming', device_manufacturer: 'Amazon' } ,
    { device_type: 'Streaming', device_manufacturer: 'Apple' } ,
    { device_type: 'Streaming', device_manufacturer: 'Google' } ,
    { device_type: 'Streaming', device_manufacturer: 'Onkyo' } ,
    { device_type: 'Streaming', device_manufacturer: 'Roku' } ,
    { device_type: 'Streaming', device_manufacturer: 'Sling Media' } ,
    { device_type: 'Streaming', device_manufacturer: 'Sonos' } ,
    { device_type: 'Streaming', device_manufacturer: 'Western Digital' } ,
    { device_type: 'Streaming', device_manufacturer: 'Xiaomi' } ,
    { device_type: 'Switch', device_manufacturer: 'Belkin' } ,
    { device_type: 'Switch', device_manufacturer: 'iDevices' } ,
    { device_type: 'Switch', device_manufacturer: 'TP-LINK' } ,
    { device_type: 'Thermostat', device_manufacturer: '' } ,
    { device_type: 'Thermostat', device_manufacturer: 'BlueLink' } ,
    { device_type: 'Thermostat', device_manufacturer: 'Ecobee' } ,
    { device_type: 'Thermostat', device_manufacturer: 'Honeywell' } ,
    { device_type: 'Thermostat', device_manufacturer: 'Nest' } ,
    { device_type: 'Thermostat', device_manufacturer: 'Netatmo' } ,
    { device_type: 'Thermostat', device_manufacturer: 'Trane' } ,
    { device_type: 'Vacuum Cleaner', device_manufacturer: 'Roomba' } ,
    { device_type: 'Vacuum Cleaner', device_manufacturer: 'Shark' } ,
    { device_type: 'Vacuum Cleaner', device_manufacturer: 'Xiaomi' } ,
    { device_type: 'Voice Assistant', device_manufacturer: '' } ,
    { device_type: 'Voice Assistant', device_manufacturer: 'Amazon' } ,
    { device_type: 'Voice Assistant', device_manufacturer: 'Google' } ,
    { device_type: 'Voice Assistant', device_manufacturer: 'Xiaomi' } ,
    { device_type: 'VOIP', device_manufacturer: 'Aastra' } ,
    { device_type: 'VOIP', device_manufacturer: 'Grandstream' } ,
    { device_type: 'VOIP', device_manufacturer: 'Linksys' } ,
    { device_type: 'VOIP', device_manufacturer: 'Obihai' } ,
    { device_type: 'VOIP', device_manufacturer: 'Sipura' } ,
    { device_type: 'Wearable', device_manufacturer: 'Apple' } ,
    { device_type: 'Wearable', device_manufacturer: 'Fitbit' } ,
    { device_type: 'Wearable', device_manufacturer: 'Samsung' } ,
];

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

const genHexStr= () => {
    var result           = '';
    var allCharacters       = "ABCDEF";
    var allNums = "0123456789";

    // var chars = (useNums) ? allNums: allCharacters;
    // var charsLength = chars.length;

    // for ( var i = 0; i < length; i++ ) {
    //     // TODO: THIS CAN BE IMPROVED
    //     result += chars.charAt(Math.floor(Math.random() * charsLength));
    // }
    const a = [];
    for(let x = 0; x < 6; x++) {
        const char1 = allNums.charAt(Math.floor(Math.random() * allNums.length));
        const char2 = allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));

        a.push(char1 + char2);
    }

    return a.join(":");

    // return result;
};

const getRandomDeviceTypeManufacturer = () => {
  return Math.floor(Math.random() * (deviceTypeManufacturer.length - 1));
};

console.log("{ \"data\": [");

for(let i = 0; i < 100; i++) {
    const deviceTypeMan = deviceTypeManufacturer[getRandomDeviceTypeManufacturer()];

    let newDevice = {
        "router_id": `${genStr(2)}-${genStr(2)}-${genStr(2)}-${genStr(64)}`.toUpperCase(),
        "event_type": "new_device",
        "did": `${genStr(2)}-${genStr(2)}-${genStr(2)}-${genStr(64)}`.toUpperCase(),
        "ip": `${genStr(2, true)}.${genStr(2, true)}.${genStr(1, true)}.${genStr(2, true)}`,
        "tot_dev_cnt": 7,
        "hostname": `${genStr(10)}`.toUpperCase(),
        "aff_id": "756",
        "topic":"new_device",
        "mac": `${genHexStr()}`,
        "account_id": `${genStr(8)}-${genStr(4)}-${genStr(4)}-${genStr(4)}-${genStr(11)}`,
        "type": deviceTypeMan.device_type,
        "manufacturer": deviceTypeMan.device_manufacturer,
        "model": "",
        "icon": ""
    };

    console.log(JSON.stringify(newDevice));

    if(i !== 99) {
        console.log(",");
    }
}

console.log("]}");