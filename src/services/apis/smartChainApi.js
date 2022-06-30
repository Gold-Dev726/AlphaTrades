import api from "./api";
export default class SmartChainAPI {
  getBalance(data) {
    console.log("SmartChainAPI data - ", data);

    // const contactResult = {
    //   code: 200,
    //   status: "SUCCESS",
    //   message: "Job Order Fetch success",
    //   success: true,
    //   data: {},
    // };

    
    // const myPromise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(contactResult);
    //   }, 3000);
    // });
    // //return myPromise;
    

		return api.getBinance(
      `?module=account&action=balance&address=${data}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.BINANCE_API_KEY}`
    );




    /*
    return api
      .post("contact", {
        params: queryParams,
      })
      .then((res) => {
        return hydratePerformances(res.data.data);
      });

      */
  }
}
