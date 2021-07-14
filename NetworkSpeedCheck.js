const http = require("http");
let { URL, Url } = require("url");
/**
 * Use the default Node URL Class if found i.e. Inside a Node environment
 * to allow http and https, otherwise use the Url consturctor for browser environments
 * strictly limited to https for secure connections
 */
URL = URL ? URL : Url;

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]{}|;':,./<>?";

class NetworkSpeedCheck {
  checkDownloadSpeed() {
    let startTime;
    const mbInBytes = 1_093_957;
    const fileUrl =
      "http://gist.githubusercontent.com/khaykov/a6105154becce4c0530da38e723c2330/raw/41ab415ac41c93a198f7da5b47d604956157c5c3/gistfile1.txt";

    return new Promise((resolve, _) => {
      return http.get(
        {
          host: "proxy.ha.kroger.com",
          port: "3128",
          path: fileUrl,
          headers: {
            Host: "gist.githubusercontent.com",
          },
        },
        (response) => {
          response.once("data", () => {
            console.log("started");
            startTime = new Date().getTime();
          });

          response.once("end", () => {
            console.log("ended");
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            // Convert bytes into bits by multiplying with 8
            const bitsLoaded = mbInBytes * 8;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1000).toFixed(2);
            const mbps = (kbps / 1000).toFixed(2);

            resolve({ duration, mbps });
          });
        }
      );
    }).catch((error) => {
      throw new Error(error);
    });
  }

  // checkUploadSpeed(options, fileSizeInBytes = 2000000) {
  //   let startTime;
  //   const defaultData = this.generateTestData(fileSizeInBytes / 1000);
  //   const data = JSON.stringify({ defaultData });
  //   return new Promise((resolve, reject) => {
  //     let req = http.request(options, res => {
  //       res.setEncoding("utf8");
  //       res.on('data', () => {});
  //       res.on("end", () => {
  //         const endTime = new Date().getTime();
  //         const duration = (endTime - startTime) / 1000;
  //         const bitsLoaded = fileSizeInBytes * 8;
  //         const bps = (bitsLoaded / duration).toFixed(2);
  //         const kbps = (bps / 1000).toFixed(2);
  //         const mbps = (kbps / 1000).toFixed(2);
  //         resolve({ bps, kbps, mbps });
  //       });
  //     });
  //     startTime = new Date().getTime();
  //     req.on('error', error => {
  //       reject(error)
  //     });
  //     req.write(data)
  //     req.end()
  //   })
  // }

  // validateDownloadSpeedParams(baseUrl, fileSizeInBytes) {
  //   if (typeof baseUrl !== 'string') {
  //     throw new Error('baseUrl must be a string')
  //   }
  //   if (typeof fileSizeInBytes !== 'number') {
  //     throw new Error('fileSizeInBytes must be a number')
  //   }
  //   return
  // }

  generateTestData(sizeInKmb) {
    const iterations = sizeInKmb * 1000; //get byte count
    let result = "";
    for (var index = 0; index < iterations; index++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

module.exports = NetworkSpeedCheck;
