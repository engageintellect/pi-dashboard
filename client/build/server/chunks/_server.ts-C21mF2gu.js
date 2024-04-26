import { S as SERVER_ENDPOINT } from './private-DZiyog08.js';

const GET = async () => {
  const res = await fetch(`${SERVER_ENDPOINT}/api/load`);
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
//# sourceMappingURL=_server.ts-C21mF2gu.js.map
