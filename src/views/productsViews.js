export const responseProducts = (res, code, data) => {
  response.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
