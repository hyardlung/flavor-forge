import request from 'superagent';
import superagentCache from 'superagent-cache';

superagentCache(request);

const baseURL = 'https://api.spoonacular.com';
const apiKey = process.env.apiKey || '';

export async function makeRequest(url: string, query: object, headers?: object | undefined): Promise<any> {
  try {
    const response = await request
      .get(baseURL + url)
      .set(headers ? headers : {})
      .query({ ...query, apiKey });
    return response.body.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}





// export function getRecipeDetails(id: number, result: {}, loading: boolean) {
//   try {
//     request.get(`/recipes/${id}`).then(res => result = res.body)
//   } catch (err) {
//     console.log(err)
//   } finally {
//     loading = false
//   }
// }

// export async function getRecipesByType(type?: string, result: [], loading: boolean) {
//   loading = true
//   try {
//     const resp = await request
//       .get(`${baseURL}/recipes/complexSearch`)
//       .query({ type: type, apiKey: apiKey.value })

//     findedRecipes.value = resp.body.results
//     console.log(resp.body.results) // возвращает массив рецептов по переданному типу
//     // findedRecipes.value = resp.body.results
//   } catch (err) {
//     console.log(err)
//   } finally {
//     searchLoading.value = false
//   }
// }

// export function getIdsAsString(arr: findedRecipe[]): string {
//   const ids: number[] = arr.map(obj => obj.id);
//   const idsString: string = ids.join(',');
//   return idsString;
// }
