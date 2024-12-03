import "dotenv/config";
import App from "./app";

export default class Server {
  private app: App;

  constructor() {
    this.app = new App();
    this.execute();
  }

  execute() {
    this.app.handle(Number(process.env.APPLICATION_PORT) || 3000);
  }
}

new Server();
