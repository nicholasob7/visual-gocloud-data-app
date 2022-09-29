const Api = {
    getbirthsData: async () => {
        const response = await fetch("https://gist.github.com/nicholasob7/c44511daa33b296065aa5f539c3cd3a6.js");
        return await response.json();
    },
};

export default Api;