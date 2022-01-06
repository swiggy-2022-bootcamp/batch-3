import { Get, Route } from "tsoa";

interface HealthcheckResponse {
  message: string;
}

@Route("ping")
export default class HealthcheckController {
  @Get("/")
  public async getMessage(): Promise<HealthcheckResponse> {
    return {
      message: "Success",
    };
  }
}