export const wrapPromise = (promise:Promise<any>) => {
    //promise를 던지기 위한 함수
    let status = "pending";
    let result:any;
    let suspend = promise.then(
      (res) => {
        status = "success";
        result = res;
      },
      (err) => {
        status = "error";
        result = err;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspend;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    };
  };