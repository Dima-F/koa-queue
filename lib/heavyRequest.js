
module.exports = async (ctx) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  ctx.body = 'Task completed';
}