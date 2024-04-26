import { S as SERVER_ENDPOINT } from './private-DZiyog08.js';

const GET = async () => {
  const res = await fetch(`${SERVER_ENDPOINT}/dashboard/api/os`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  } else {
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" }
    });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-DolUX5Ck.js.map
