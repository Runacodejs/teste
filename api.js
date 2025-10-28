async function getStreamingAvailability(tmdbId) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '1b319ce0f8msh3ba6dcae0cd68d6p1a059cjsn2670dd3e69b6',
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/v2/get/basic?country=br&tmdb_id=${tmdbId}`, options);
    const data = await response.json();
    console.log(data);

    if (data.result && data.result.streamingInfo && data.result.streamingInfo.br) {
        const streamingServices = data.result.streamingInfo.br;
        let servicesMessage = "Disponível em:\n\n";
        const serviceNames = Object.keys(streamingServices);

        if(serviceNames.length > 0) {
            serviceNames.forEach(service => {
                const serviceInfo = streamingServices[service];
                const type = serviceInfo[0].type;
                const capitalizedService = service.charAt(0).toUpperCase() + service.slice(1);
                servicesMessage += `- ${capitalizedService} (${type})\n`;
            });
        } else {
            servicesMessage = "Não foram encontrados serviços de streaming para este filme no Brasil.";
        }

        alert(servicesMessage);
    } else {
        alert("Não foram encontradas informações de streaming para este filme.");
    }

    return data;
  } catch (error) {
    console.error(error);
    alert("Ocorreu um erro ao buscar a disponibilidade de streaming.");
  }
}

async function searchMovies(query) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '1b319ce0f8msh3ba6dcae0cd68d6p1a059cjsn2670dd3e69b6',
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${query}&country=br&show_type=movie&output_language=en`, options);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(error);
  }
}