/**
 * Cloudflare Worker Proxy for DSG Servisi WordPress API
 * Bu worker, Vercel build sunucularından gelen WordPress API isteklerini proxy eder
 * ve Hostinger Mod_Security engelini bypass eder.
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORS preflight request'i handle et
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      }
    })
  }

  try {
    // URL'yi parse et ve WordPress API'ye yönlendir
    const url = new URL(request.url)
    const path = url.pathname.replace('/wp-json/wp/v2', '') // Worker URL'den wp-json/wp/v2 kısmını çıkar
    const search = url.search
    
    // WordPress API URL'ini oluştur
    const targetUrl = `https://dsgservisi.com/wp-json/wp/v2${path}${search}`
    
    // Request'i WordPress'e forward et
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: {
        ...request.headers,
        'User-Agent': 'Mozilla/5.0 (compatible; CloudflareWorker/1.0)',
        'Accept': 'application/json, text/html, */*',
        'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      body: request.body
    })
    
    // WordPress API'den response al
    const response = await fetch(modifiedRequest)
    
    // Response'u client'a gönder (CORS headers ile)
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Cache-Control': 'public, max-age=300', // 5 dakika cache
      }
    })
    
  } catch (error) {
    // Hata durumunda error response döndür
    console.error('Worker Error:', error)
    
    return new Response(JSON.stringify({
      error: 'Proxy Error',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}
