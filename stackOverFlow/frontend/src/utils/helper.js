export default class Fetch {
  static request = async (options) => {
    const { method, url, data } = options;

    let headers = Object.assign({}, options.headers ?? {});

    headers["Content-Type"] = "application/json";
    const body = JSON.stringify(options.data);

    let fetchOptions = {
      method: method,
      headers: headers,
      body,
    };

    return await fetch(url, fetchOptions);
  };
}
