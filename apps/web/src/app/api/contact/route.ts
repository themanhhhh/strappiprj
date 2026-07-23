import {NextResponse} from 'next/server';
import {google} from 'googleapis';

type ContactPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceInterestSlug?: string;
  message?: string;
  website?: string;
};

async function appendToGoogleSheet(data: {
  fullName: string;
  phone: string;
  email: string;
  serviceInterest: string;
  message: string;
}): Promise<boolean> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail && !privateKey && !spreadsheetId) return false;
  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error('Google Sheets configuration is incomplete.');
  }

  const normalizedPrivateKey = privateKey
    .replace(/^['"]|['"]$/g, '')
    .replace(/\\+n/g, '\n')
    .replace(/\r/g, '')
    .trim();

  if (!normalizedPrivateKey.includes('-----BEGIN PRIVATE KEY-----')
    || !normalizedPrivateKey.includes('-----END PRIVATE KEY-----')) {
    throw new Error('GOOGLE_SHEETS_PRIVATE_KEY is not a valid PEM private key.');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: normalizedPrivateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({version: 'v4', auth});

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: process.env.GOOGLE_SHEETS_RANGE || "'Trang tính1'!A:E",
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[
        data.fullName,
        data.phone,
        data.email,
        data.serviceInterest,
        data.message,
      ]],
    },
  });

  return true;
}

export async function POST(request: Request) {
  const strapiUrl = process.env.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({message: 'Invalid request body.'}, {status: 400});
  }

  const fullName = payload.fullName?.trim() || '';
  const phone = payload.phone?.trim() || '';
  const email = payload.email?.trim() || '';
  const message = payload.message?.trim() || '';
  const serviceInterestSlug = payload.serviceInterestSlug?.trim() || '';
  const website = payload.website?.trim() || '';

  if (website) {
    return NextResponse.json({message: 'Submission received.'}, {status: 200});
  }

  if (!fullName || !message || (!phone && !email)) {
    return NextResponse.json(
      {message: 'Full name, project summary, and one contact method are required.'},
      {status: 400}
    );
  }

  const data: Record<string, string> = {
    fullName,
    phone,
    email,
    message,
    serviceInterest: serviceInterestSlug,
    status: 'new'
  };

  let strapiError: string | null = null;

  if (strapiUrl && token) {
    const response = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({data}),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      strapiError = errorText || response.statusText;
      console.error('Strapi contact submission failed:', strapiError);
    }
  } else {
    strapiError = 'STRAPI_URL or STRAPI_API_TOKEN is not configured.';
  }

  try {
    const googleSheetsSaved = await appendToGoogleSheet({
      fullName,
      phone,
      email,
      serviceInterest: serviceInterestSlug,
      message,
    });

    if (strapiError && !googleSheetsSaved) {
      return NextResponse.json(
        {message: 'The enquiry could not be saved to Strapi or Google Sheets.'},
        {status: 502},
      );
    }
  } catch (error) {
    console.error('Google Sheets contact append failed:', error);
    return NextResponse.json(
      {message: strapiError
        ? 'The enquiry could not be saved to Strapi or Google Sheets.'
        : 'The enquiry was saved, but syncing to Google Sheets failed.'},
      {status: 502},
    );
  }

  return NextResponse.json({
    message: strapiError
      ? 'Your enquiry was submitted to Google Sheets. Strapi sync is currently unavailable.'
      : 'Your enquiry has been submitted.',
  }, {status: 201});
}
