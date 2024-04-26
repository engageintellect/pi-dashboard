import { P as PUBLIC_BASE_URL } from './public-CNI0uqrl.js';

const GET = async () => {
  const res = await fetch(`${PUBLIC_BASE_URL}/pb/_/`);
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
//# sourceMappingURL=_server.ts-DBR4VNCx.js.map
