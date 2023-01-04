class Http {
  static instance = new Http();

  get = async (url: string) => {
    try {
      const req = await fetch(url);
      const json = await req.json();
      return json;
    } catch (error) {
      console.log('http get method error', error);
      throw error;
    }
  };

  post = async (url: string, body: BodyInit_ | undefined) => {
    try {
      const req = await fetch(url, {method: 'POST', body});
      const json = await req.json();
      return json;
    } catch (error) {
      console.log('http post method error', error);
      throw error;
    }
  };
}

export default Http;
