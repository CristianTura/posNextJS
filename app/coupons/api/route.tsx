export async function POST(request: Request) {
    const body = await request.json();
    const url = `${process.env.API_URL}/coupons/apply-coupon`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return Response.json({...data, status: response.status});
}
