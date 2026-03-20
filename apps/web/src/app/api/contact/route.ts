import {NextResponse} from 'next/server';

type ContactPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceInterestSlug?: string;
  message?: string;
  website?: string;
};

async function resolveServiceId(strapiUrl: string, token: string, slug: string) {
  const query = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': '1'
  });

  const response = await fetch(`${strapiUrl}/api/services?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    return undefined;
  }

  const json = (await response.json()) as {data?: Array<{id: number}>};
  return json.data?.[0]?.id;
}

export async function POST(request: Request) {
  const strapiUrl = process.env.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;

  if (!strapiUrl || !token) {
    return NextResponse.json(
      {message: 'Server configuration is incomplete. Set STRAPI_URL and STRAPI_API_TOKEN.'},
      {status: 500}
    );
  }

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
      {message: 'Full name, project brief, and one contact method are required.'},
      {status: 400}
    );
  }

  const data: Record<string, string | number> = {
    fullName,
    phone,
    email,
    message,
    status: 'new'
  };

  if (serviceInterestSlug) {
    const serviceId = await resolveServiceId(strapiUrl, token, serviceInterestSlug);
    if (serviceId) {
      data.serviceInterest = serviceId;
    }
  }

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
    return NextResponse.json(
      {message: `Strapi submission failed: ${errorText || response.statusText}`},
      {status: 502}
    );
  }

  return NextResponse.json({message: 'Your enquiry has been submitted.'}, {status: 201});
}
