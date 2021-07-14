const NetworkSpeed = require('./NetworkSpeedCheck');
const testNetworkSpeed = new NetworkSpeed();

async function getNetworkDownloadSpeed() {
  const speed = await testNetworkSpeed.checkDownloadSpeed();
  console.log(speed);
}

try {
  getNetworkDownloadSpeed();
} catch(err) {
  console.log(err)
}

// getNetworkUploadSpeed();
// 
// async function getNetworkUploadSpeed() {
//   const options = {
//     hostname: 'www.google.com',
//     port: 80,
//     path: '/catchers/544b09b4599c1d0200000289',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const fileSizeInBytes = 2000000
//   const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
//   console.log(speed);
// }