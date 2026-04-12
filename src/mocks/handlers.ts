import { http, HttpResponse } from 'msw'
import home from './data/lumen-home.json'

export const handlers = [http.get('*/home', ({}) => HttpResponse.json(home))]
