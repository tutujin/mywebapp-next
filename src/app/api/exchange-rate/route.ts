import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromCurrency = searchParams.get('from');

  const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
  const API_BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${fromCurrency}`);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
