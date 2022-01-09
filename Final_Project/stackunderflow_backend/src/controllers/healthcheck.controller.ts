import { Get, Route } from "tsoa";

interface HealthcheckResponse {
  message: string;
}

@Route("healthcheck")
export default class HealthcheckController {
  @Get("/")
  public async getMessage(): Promise<HealthcheckResponse> {
    return {
      message: "Success",
    };
  }
}