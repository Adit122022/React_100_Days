import { treaty } from '@elysiajs/eden'
import type { app } from '../app/api/[[...slugs]]/route'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
// .api to enter /api prefix
export const client = treaty<typeof app>(API_BASE_URL).api
