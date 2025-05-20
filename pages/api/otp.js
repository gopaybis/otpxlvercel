export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { action, contact, otp } = req.body;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic MDE4ZWRmOTQtMzkzZi03YjZmLWFlNGQtYWI3Mjg0OGE1NzNmOkRPbFNEdkp6UGs2U3dEMW95VEVFN01jVlc0cTJ6b2Nh',
    'ax-device-id': '254523913e728adc8dd907189eb6ad20'
  };

  try {
    let fetchUrl = '';
    let fetchOptions = { headers };

    if (action === 'send') {
      fetchUrl = `https://gede.ciam.xlaxiata.co.id/realms/xl-ciam/auth/otp?contact=${contact}&contactType=SMS`;
      fetchOptions.method = 'GET';
    } else if (action === 'verify') {
      fetchUrl = `https://gede.ciam.xlaxiata.co.id/realms/xl-ciam/auth/otp/verify`;
      fetchOptions.method = 'POST';
      fetchOptions.body = JSON.stringify({ contact, otp });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const apiResponse = await fetch(fetchUrl, fetchOptions);
    const text = await apiResponse.text();
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch: ' + err.message });
  }
}