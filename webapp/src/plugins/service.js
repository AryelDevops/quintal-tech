import api from "../api";

export default {
  install(Vue) {
    const create = async ({ path = "", data } = {}) => {
      const response = await api.post(`${path}`, data);
      return response;
    };

    const load = async ({
      path = "",
      id = null,
      start = 0,
      limit = 10,
      q,
    } = {}) => {
      const url = `${path}${id ? `/${id}` : ""}`;

      const response = await api.get(url, {
        params: {
          ...q,
          start,
          limit,
        },
      });

      return response.data;
    };

    const update = async ({ path = "", id = null, data } = {}) => {
      let payload = {
        ...data,
      };

      if (id) payload.id = id;

      const url = `${path}${id ? `/${id}` : ""}`;
      const response = await api.put(url, payload);
      return response.data;
    };

    const patch = async ({ path = "", id = null, data } = {}) => {
      let payload = {
        ...data,
      };

      if (id) payload.id = id;

      const url = `${path}${id ? `/${id}` : ""}`;
      const response = await api.patch(url, payload);
      return response.data;
    };

    const remove = async ({ path = "", id } = {}) => {
      var response = await api.delete(`${path}/${id}`, {});
      return response.data;
    };

    Vue.prototype.$service = {
      create,
      load,
      update,
      remove,
      patch,
    };
  },
};
