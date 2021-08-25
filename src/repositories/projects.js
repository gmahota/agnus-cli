import Repository, { baseUrl, serializeQuery } from "./Repository";

const list = async (filter) => {
  try {
    let res = [];

    await Repository.get(`${baseUrl}/projects`).then(
      (response) => (res = response.data)
    );

    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Project = async (id) => {
  try {
    const url = `${baseUrl}/projects/${id}`;

    let res = {};

    await Repository.get(url).then((response) => (res = response.data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const create = async (data) => {
  const url = publicRuntimeConfig.SERVER_URI + `api/base/products`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  router.push("/projects");
};
export default { list, get_Project, create };
