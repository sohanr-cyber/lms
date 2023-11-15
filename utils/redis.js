import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://apn1-immortal-kiwi-34103.upstash.io",
  token:
    "AYU3ASQgOTc4ZTAyNWItMDdkOC00YjVkLTgxNjUtNmRiYWI0OTc3ODI0YzkxZWRmZmE2MWExNDkyMmFiZmFiZjFkNmMwNTI3ZWY=",
});
export default redis;
