import { RequestType, ResponseType } from "src/server";
import stripeService from "../services/stripe-service";

const HTTP_ERROR_STATUS = 400;

type createSessionBodyType = {
  walletAddress: string;
};

async function getStripeClientSecret(
  request: RequestType<{}, createSessionBodyType>,
  response: ResponseType
) {
  try {
    const stripeResponse = await stripeService.getStripeClientSecret(
      request.body
    );

    return response.send(stripeResponse);
  } catch (error: any) {
    response.status(HTTP_ERROR_STATUS);

    return response.send(error.response.data);
  }
}

type getSessionParamsType = {
  sessionId: string;
};

async function getStripeSession(
  request: RequestType<getSessionParamsType, {}>,
  response: ResponseType
) {
  const { sessionId } = request.params;

  try {
    const stripeResponse = await stripeService.getStripeSession(sessionId);

    return response.send(stripeResponse);
  } catch (error: any) {
    response.status(HTTP_ERROR_STATUS);

    return response.send(error.response.data);
  }
}

const stripeController = {
  getStripeClientSecret,
  getStripeSession,
};

export default stripeController;
