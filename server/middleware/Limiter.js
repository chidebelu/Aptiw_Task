// import { RateLimiter } from "limiter";
import pkg from "limiter"

const {RateLimiter} = pkg
const limiter = new RateLimiter({ tokensPerInterval: 10, interval: "second" });

const limiterMiddleWare = async (_req, res, next) => {
    try {
        const remainingRequests = await limiter.removeTokens(1);
        if(remainingRequests < 1){
            return res.status(400).json({message:"Maximum Request Per Minute Exceeded"})

        }
      next();
    } catch (error) {
      next(error);
    }
  };

  export default limiterMiddleWare