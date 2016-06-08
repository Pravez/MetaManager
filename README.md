# MetaManager 
##### An app to rule them all

***

Electron application to control many metabots (and bots) simultaneously. It interacts with [i-score](https://github.com/OSSIA/i-score)


To run the app : `npm install && npm start`

Be careful, problem with node OSC. Line 72 osc-transport.js, need to convert the Uint8Array to Buffer.