// Physical device information for board and sensor
#define DEVICE_ID "iot_device"
#define DHT_TYPE DHT22

// Pin layout configuration
#define LED_PIN 5
#define DHT_PIN 2
//#define debug Serial 

#define TEMPERATURE_ALERT 30
#define HEARTBEAT_ALERT 40
// Interval time(ms) for sending message to IoT Hub
#define INTERVAL 2000

// If don't have a physical DHT sensor, can send simulated data to IoT hub
#define SIMULATED_DATA false

// EEPROM address configuration
#define EEPROM_SIZE 512

// SSID and SSID password's length should < 32 bytes
// http://serverfault.com/a/45509
#define SSID_LEN 32
#define PASS_LEN 32
#define CONNECTION_STRING_LEN 256

#define MESSAGE_MAX_LEN 256
