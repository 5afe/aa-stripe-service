import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

type stripeSuccessType = Promise<{
  clientSecret: string;
}>;

type stripeErrorType = any;

dotenv.config();

const { STRIPE_SERVER_SECRET_KEY } = process.env;

const STRIPE_BASE_URL = "https://api.stripe.com";
const GET_STRIPE_CLIENT_SECRET_PATH = "v1/crypto/onramp_sessions";

const axiosStripeAPI: AxiosInstance = axios.create({
  baseURL: STRIPE_BASE_URL,
  headers: {
    Authorization: `Bearer ${STRIPE_SERVER_SECRET_KEY}`,
    "content-type": "application/x-www-form-urlencoded",
  },
});

async function getStripeClientSecret(
  walletAddress: string
): Promise<stripeSuccessType | stripeErrorType> {
  const { data } = await axiosStripeAPI.post<stripeSuccessType>(
    GET_STRIPE_CLIENT_SECRET_PATH,
    {
      transaction_details: {
        wallet_address: walletAddress,
        lock_wallet_address: true,
        supported_destination_networks: ["polygon"],
      },
    }
  );

  return data;
}

async function getStripeSession(sessionId: string) {
  const { data } = await axiosStripeAPI.get<stripeSuccessType>(
    `${GET_STRIPE_CLIENT_SECRET_PATH}/${sessionId}`
  );

  return data;
}

const stripeService = {
  getStripeClientSecret,
  getStripeSession,
};

export default stripeService;
