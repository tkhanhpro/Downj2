const axios = require('axios');

async function j2(url) {
  const baseUrl = 'https://j2download.com';
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';

  try {
    const index = await axios.get(`${baseUrl}/vi`, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      maxRedirects: 5,
    });

    const setCookies = index.headers['set-cookie'];
    if (!setCookies || setCookies.length === 0) {
      throw new Error('Không tìm được token');
    }

    const cookies = {};
    setCookies.forEach((cookie) => {
      const [nameValue] = cookie.split(';');
      const [name, value] = nameValue.split('=');
      if (name && value) {
        cookies[name.trim()] = value.trim();
      }
    });

    if (!cookies.api_token || !cookies.csrf_token) {
      throw new Error('Không tìm thấy api_token hoặc csrf_token');
    }

    const cookieString = Object.entries(cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join('; ');

    const response = await axios.post(
      `${baseUrl}/api/autolink`,
      {
        data: {
          url: url,
          unlock: true,
        },
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
          'Content-Type': 'application/json',
          'User-Agent': userAgent,
          'Referer': `${baseUrl}/vi`,
          'Origin': baseUrl,
          'Cookie': cookieString,
          'X-CSRF-Token': cookies.csrf_token,
          'Priority': 'u=1, i',
          'Sec-CH-UA': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
          'Sec-CH-UA-Mobile': '?0',
          'Sec-CH-UA-Platform': '"Windows"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Lỗi khi fetch dữ liệu: ${error.message}`);
  }
}

module.exports = { j2 };
