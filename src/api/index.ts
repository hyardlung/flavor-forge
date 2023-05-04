import request from 'superagent';
import superagentCache from 'superagent-cache';

superagentCache(request);

const baseURL = 'https://api.spoonacular.com';
const apiKey = process.env.apiKey || '';

export async function makeRequest(url: string, query?: object, headers?: object | undefined): Promise<any> {
  try {
    const response = await request
      .get(baseURL + url)
      .set(headers ? headers : {})
      .query({ ...query, apiKey });
    return response.body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
