const GET = async () => {
  const data = {
    message: "hello from sveltekit server",
    os: "arch linux"
  };
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-CdeUHvWY.js.map
