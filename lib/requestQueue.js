class RequestQueue {
    constructor() {
      this.queues = {};
      this.running = {};
    }
  
    enqueue(ctx, next) {
      const { name } = ctx.request.body;
  
      if (!this.queues[name]) {
        this.queues[name] = [];
        this.running[name] = false;
      }
  
      return new Promise((resolve, reject) => {
        this.queues[name].push({ ctx, next, resolve, reject });
  
        if (!this.running[name]) {
          this.running[name] = true;
          this.processQueue(name);
        }
      });
    }
  
    processQueue(name) {
      if (this.queues[name].length === 0) {
        this.running[name] = false;
        return;
      }
  
      const { /*ctx,*/ next, resolve, reject } = this.queues[name].shift();
  
      next()
        .then(() => {
          resolve();
          this.processQueue(name);
        })
        .catch((error) => {
          reject(error);
          this.processQueue(name);
        });
    }
}

module.exports = new RequestQueue();