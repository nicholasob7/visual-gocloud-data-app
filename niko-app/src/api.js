const Api = {
    getArrivalsData: async () => {
        const response = await fetch("");
        return await response.json();
    },
};

export default Api;
