export const responseHandler = (res: any, body: any, code: number) => {
  res.status(code);
  res.json(body);
};
