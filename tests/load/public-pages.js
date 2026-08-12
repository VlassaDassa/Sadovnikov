import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    {
      duration: "30s",
      target: 5,
    },
    {
      duration: "1m",
      target: 20,
    },
    {
      duration: "30s",
      target: 0,
    },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
  },
};

const baseUrl = __ENV.BASE_URL;

export default function () {
  const homeResponse = http.get(`${baseUrl}/`);

  check(homeResponse, {
    "home status is 200": (response) => response.status === 200,
  });

  const russianResponse = http.get(`${baseUrl}/ru`);

  check(russianResponse, {
    "russian status is 200": (response) => response.status === 200,
  });

  const projectResponse = http.get(`${baseUrl}/project/1`);

  check(projectResponse, {
    "project status is valid": (response) => {
      return response.status === 200 || response.status === 404;
    },
  });

  sleep(1);
}
