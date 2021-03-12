export default class ApiService {

    checkFetchResult(result) {
        if (!result) {
            throw new Error(`Could not fetch ` + 
              `, received ${result}`)
          }
    }

    async fetch (url) {
      const res = await fetch(url)
      this.checkFetchResult(res)
      const result = await res.json();
      return result;
    }

    postData (bodyData) {
       return {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bodyData)
          }
    }
}