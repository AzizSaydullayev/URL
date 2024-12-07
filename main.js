const BASE_URL = "https://api.nationalize.io/";
let params = "?name=";

const getData = async () => {
    const nameInput = document.getElementById("nameInput").value.trim();
    if (nameInput === "") {
        document.getElementById("result").innerText = "Please enter a name.";
        return;
    }

    const FULL_API = BASE_URL + params + nameInput;

    try {
        const res = await fetch(FULL_API);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        const results = data.country.map(country => {
            const flagUrl = `https://flagpedia.net/data/flags/h80/${country.country_id.toLowerCase()}.png`;
            return `
                <div>
                    <img src="${flagUrl}" alt="${country.country_id} flag" style="width:50px; height:auto; margin-right:10px;">
                    <strong>${country.country_id}</strong> - Probability: ${(country.probability * 100).toFixed(2)}%
                </div>
            `;
        }).join("");

        document.getElementById("result").innerHTML = `
            <h3>Results for: ${nameInput}</h3>
            ${results || "No nationality predictions available."}
        `;
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
};