import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from "axios";

export const useRequesterStore = defineStore("requester", () => {
  const user = useUserStore();

  const deffaultHeader = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3500,
  });

  const outClient = axios.create();

  function makeHeader(withAuth, extraHeader) {
    return {
      ...deffaultHeader,
      ...(withAuth ? { 
        Authorization: "Bearer " + user.token
      } : {}),
      ...extraHeader,
    };
  }

  function Get({
    route,
    withAuth = false,
    extraHeader = {},
    external = false,
    params = {}
  }) {
    const cli = external ? outClient : client;
    return cli.get(route, { headers: makeHeader(withAuth, extraHeader), params });
  }

  function Put({
    route,
    withAuth = false,
    extraHeader = {},
    body = {},
    external = false,
  }) {
    const cli = external ? outClient : client;
    return cli.put(route, body, { headers: makeHeader(withAuth, extraHeader) });
  }

  function Post({
    route,
    withAuth = false,
    extraHeader = {},
    body = {},
    external = false,
  }) {
    const cli = external ? outClient : client;
    return cli.post(route, body, {
      headers: makeHeader(withAuth, extraHeader),
    });
  }

  function Delete({
    route,
    withAuth = false,
    extraHeader = {},
    external = false,
  }) {
    const cli = external ? outClient : client;
    return cli.delete(route, { headers: makeHeader(withAuth, extraHeader) });
  }

  return { client, outClient, Get, Put, Post, Delete };
});
