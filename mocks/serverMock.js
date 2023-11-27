
import { http, HttpResponse, delay } from 'msw'


export const productsHandlers = [
    http.get('http://localhost:8080/api/products', async () => {
      await delay(150)
      return HttpResponse.json([
        { id: 1, name: "cats are cool", detail: "here are all the cool cats", price: 10, imageUrl: "www.image.com" },
        { id: 2, name: "dogs are cool", detail: "here are all the cool dogs", price: 12, imageUrl: "www.images.com" },
    ])
    })
  ]
  
// make different handler for each api endpoint on front end